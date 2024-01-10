"use client";

import RoomDetails from "@/app/components/new-room/RoomDetails";
import RoomLayout from "@/app/components/new-room/RoomLayout";
import RoomConfirm from "@/app/components/new-room/RoomConfirm";
import { ChangeEvent, useState } from "react";

export default function Page() {
    const [step, setStep] = useState(0);
    const [data, setData] = useState({
        roomName: "",
        numSeats: "1",
        dimensions: {
            rows: "1",
            columns: "1",
        },
    });

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
                        [nestedProperty]: value,
                    },
                };
            }

            return {
                ...prevData,
                [name]: value,
            };
        });
        console.log(data);
    };

    const formFunctions = { setStep, handleChange, data };

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
