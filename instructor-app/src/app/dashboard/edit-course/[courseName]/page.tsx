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
        oldCourseCode: string;
        courseCode: string;
        courseName: string;
        room: string[];
        classList: Student[];
        isFileChanged: boolean;
    }>({
        oldCourseCode: "",
        courseCode: "",
        courseName: "",
        room: [],
        classList: [],
        isFileChanged: false
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
                            oldCourseCode: course,
                            courseCode: course,
                            courseName: courseDetails["courseName"],
                            room: courseDetails["courseRoom"],
                            classList: courseDetails["classList"],
                            isFileChanged: false
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


    //createCourse function modified to edit course instead
    const createCourse = async () => {
        const formData = new FormData();
        formData.append("courseInfo", JSON.stringify(data));
        formData.append("", file as Blob);
        const response = await fetch(
            "http://localhost:5001/student-attendance-capst-7115c/us-central1/api/professor/updateCourse",
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
            setData(
                {
                    oldCourseCode: data["oldCourseCode"],
                    courseCode: data["courseCode"],
                    courseName: data["courseName"],
                    room: data["room"],
                    classList: data["classList"],
                    isFileChanged: true
                }
            );
        }
    };

    const students = data["classList"];
    const editFlag = true;
    const formFunctions = { setStep, handleChange, createCourse, handleFileChange, data, file, rooms, students, editFlag };

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
