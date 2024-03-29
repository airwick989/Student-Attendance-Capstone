"use client";

import RoomDetails from "@/app/components/new-room/RoomDetails";
import RoomLayout from "@/app/components/new-room/RoomLayout";
import RoomConfirm from "@/app/components/new-room/RoomConfirm";
import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";

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

    const createRoom = async () => {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/professor/createRoom`,
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

    const formFunctions = { setStep, handleChange, createRoom, data };

    const formElements = [
        <RoomDetails key={0} {...formFunctions} />,
        <RoomLayout key={1} {...formFunctions} />,
        <RoomConfirm key={2} {...formFunctions} />,
    ];

    return (
        <>
            <div className="min-h-screen bg-base-200">
                <div className="flex flex-col items-center xl:px-96 lg:px-64 px-8">
                    {formElements[step]}
                </div>
            </div>
        </>
    );
}
