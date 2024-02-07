"use client";

import { ChangeEvent, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import CourseDetails from "@/app/components/new-course/CourseDetails";
import EditCourseList from "@/app/components/EditCourseList";
import CourseConfirm from "@/app/components/new-course/CourseConfirm";
import Loading from "./loading";

export default function Page() {
    const router = useRouter();
    interface Student {
        studentName: string;
        studentId: string;
        sis: string;
        email: string;
        section: string;
    }
    const [step, setStep] = useState(0);
    const [file, setFile] = useState<File | null>(null);
    const [data, setData] = useState<{
        courseCode: string;
        courseName: string;
        room: string[];
        classList: Student[];
    }>({
        courseCode: "",
        courseName: "",
        room: [],
        classList: [],
    });

    const route_prefix = "http://localhost:6969/dashboard/edit-course/"
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            var curr_route = window.location.href;
            const course = curr_route.replace(route_prefix, '')

            try {
                const res = await fetch(
                    "http://localhost:5001/student-attendance-capst-7115c/us-central1/api/professor/getAllRoomNames",
                    { next: { revalidate: 5 } }
                );
                const data = await res.json();
                setRooms(data);



                try {

                    const response = await fetch(
                        `http://localhost:5001/student-attendance-capst-7115c/us-central1/api/professor/editCourse?courseCode=${course}`,
                        {
                            method: "GET",
                        }
                        
                    );
                    const courseDetails = await response.json();
                    console.log(courseDetails);
                    setData(
                        {
                            courseCode: course,
                            courseName: courseDetails["courseName"],
                            room: courseDetails["courseRoom"],
                            classList: courseDetails["classList"],
                        }
                    );
                    setLoading(false);
                } catch (error) {
                    console.error("Error:", error);
                    setLoading(false);
                }
            } catch (error) {
                console.error("Error:", error);
                setLoading(false);
            }
        })();
    }, []);

    const createCourse = async () => {
        const formData = new FormData();
        formData.append("courseInfo", JSON.stringify(data));
        formData.append("", file as Blob);
        const response = await fetch(
            "http://localhost:5001/student-attendance-capst-7115c/us-central1/api/professor/createCourse",
            {
                method: "POST",
                body: formData,
            }
        );
        if (await response.ok) {
            router.push("/dashboard/courses");
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

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFile(file);
        }
    };

    const students = data["classList"];
    const formFunctions = { setStep, handleChange, createCourse, handleFileChange, data, file, rooms, students };

    const formElements = [
        <CourseDetails {...formFunctions} key={0} />,
        <EditCourseList {...formFunctions} key={1} />,
        <CourseConfirm {...formFunctions} key={2} />,
    ];

    return (
        <>
            {loading && <Loading />}
            <div className="min-h-screen bg-base-200">
                <div className="flex flex-col items-center xl:px-96 lg:px-64 px-16">
                    {formElements[step]}
                </div>
            </div>
        </>
    );
}
