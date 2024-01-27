"use client";

import { ChangeEvent, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import CourseDetails from "@/app/components/new-course/CourseDetails";
import CourseList from "@/app/components/new-course/CourseList";
import CourseConfirm from "@/app/components/new-course/CourseConfirm";
import Loading from "./loading";

export default function Page() {
    const router = useRouter();
    const [step, setStep] = useState(0);
    const [data, setData] = useState<{
        courseCode: string;
        courseName: string;
        room: string[];
    }>({
        courseCode: "",
        courseName: "",
        room: [],
    });

    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch(
                    "http://localhost:5001/student-attendance-capst-7115c/us-central1/api/professor/getAllRoomNames",
                    { next: { revalidate: 5 } }
                );
                const data = await res.json();
                setRooms(data);
                setLoading(false);
            } catch (error) {
                console.error("Error:", error);
                setLoading(false);
            }
        })();
    }, []);

    const createCourse = async () => {
        const response = await fetch(
            "http://localhost:5001/student-attendance-capst-7115c/us-central1/api/professor/createCourse",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            }
            
        );
        if(await response.ok){
            router.push("/dashboard/courses")
        }
    };

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value, type } = e.target;
        setData((prevData) => {
            if (type === "select-multiple" && e.target instanceof HTMLSelectElement) {
                const selectedRooms = Array.from(e.target.options)
                    .filter((option) => option.selected)
                    .map((option) => option.value);

                return { ...prevData, [name]: selectedRooms };
            }

            return { ...prevData, [name]: value };
        });

    };

    const formFunctions = { setStep, handleChange, createCourse, data, rooms };

    const formElements = [
        <CourseDetails {...formFunctions} key={0} />,
        <CourseList {...formFunctions} key={1} />,
        <CourseConfirm {...formFunctions} key={2} />,
    ];

    return (
        <>
            {loading && <Loading/>}
            <div className="min-h-screen bg-base-200">
                <div className="flex flex-col items-center xl:px-96 lg:px-64 px-16">
                    {formElements[step]}
                </div>
            </div>
        </>
    );
}
