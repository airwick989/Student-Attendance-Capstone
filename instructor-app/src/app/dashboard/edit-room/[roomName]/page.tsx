"use client";

import RoomDetails from "@/app/components/new-room/RoomDetails";
import RoomLayout from "@/app/components/new-room/RoomLayout";
import RoomConfirm from "@/app/components/new-room/RoomConfirm";
import { ChangeEvent, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Loading from "./loading";
import { Console } from "console";

export default function Page() {
    const router = useRouter();
    const [step, setStep] = useState(0);
    const [data, setData] = useState({
        roomName: "",
        numSeats: 1,
        dimensions: {
            rows: 1,
            columns: 1,
        },
    });

    const route_prefix = "http://localhost:6969/dashboard/edit-room/"
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        (async () => {
            var curr_route = window.location.href;
            const room = curr_route.replace(route_prefix, '')

            try {

                const response = await fetch(
                    `http://localhost:5001/student-attendance-capst-7115c/us-central1/api/professor/editRoom?roomName=${room}`,
                    {
                        method: "GET",
                    }
                    
                );
                const roomDetails = await response.json();
                console.log(roomDetails);
                setData(
                    {
                        roomName: room,
                        numSeats: roomDetails['seatNum'],
                        dimensions: {
                            rows: roomDetails['dimensions']['rows'],
                            columns: roomDetails['dimensions']['columns']
                        }
                    }
                );
                setLoading(false);
            } catch (error) {
                console.error("Error:", error);
                setLoading(false);
            }
            
        })();
    }, []);

    console.log(data)


    const createRoom = async () => {
        const response = await fetch(
            "http://localhost:5001/student-attendance-capst-7115c/us-central1/api/professor/createRoom",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            }
            
        );
        if(await response.ok){
            router.push("/dashboard/rooms")
        }
    };

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setData((prevData) => {
            if (name.startsWith("dimensions.")) {
                const nestedProperty = name.split(".")[1];
                return {
                    ...prevData,
                    dimensions: {
                        ...prevData.dimensions,
                        [nestedProperty]: parseInt(value, 10),
                    },
                };
            }
            if (name === "numSeats") {
                return {
                    ...prevData,
                    [name]: parseInt(value, 10),
                };
            }

            return {
                ...prevData,
                [name]: value,
            };
        });
    };

    const editFlag = true;
    const formFunctions = { setStep, handleChange, createRoom, data, editFlag };

    const formElements = [
        <RoomDetails key={0} {...formFunctions} />,
        <RoomLayout key={1} {...formFunctions} />,
        <RoomConfirm key={2} {...formFunctions} />,
    ];

    return (
        <>
            <div className="min-h-screen bg-base-200">
                <div className="flex flex-col items-center xl:px-96 lg:px-64 px-16">
                    {formElements[step]}
                </div>
            </div>
        </>
    );
}
