"use client";

import { ChangeEvent, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import CourseDetails from "@/app/components/new-course/CourseDetails";
import CourseList from "@/app/components/new-course/CourseList";
import CourseConfirm from "@/app/components/new-course/CourseConfirm";
import Loading from "./loading";

type ValuePiece = Date | string | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];
type MeetingTime = {
    meetingDate: string;
    timeRange: Value;
};

export default function Page() {
    const router = useRouter();
    const [step, setStep] = useState(0);
    const [file, setFile] = useState<File | null>(null);
    const [data, setData] = useState<{
        courseCode: string;
        courseName: string;
        room: string[];
        meetingTimes: MeetingTime[];
    }>({
        courseCode: "",
        courseName: "",
        room: [],
        meetingTimes: [
            {
                meetingDate: "",
                timeRange: ["12:00", "13:00"],
            },
        ],
    });

    const [rooms, setRooms] = useState([]);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const roomResponse = await fetch(
                    "http://localhost:5001/student-attendance-capst-7115c/us-central1/api/professor/getAllRoomNames",
                    { next: { revalidate: 5 } }
                );
                const courseResponse = await fetch(
                    "http://localhost:5001/student-attendance-capst-7115c/us-central1/api/professor/getAllClasses",
                    { next: { revalidate: 5 } }
                );
                const roomData = await roomResponse.json();
                const courseData = await courseResponse.json();
                setRooms(roomData);
                setCourses(courseData);
                setLoading(false);
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

    const addMeetingTime = () => {
        setData((prevData) => {
            return {
                ...prevData,
                meetingTimes: prevData.meetingTimes.concat({
                    meetingDate: "",
                    timeRange: prevData.meetingTimes[0].timeRange,
                }),
            };
        });
    };

    const removeMeetingTime = () => {
        setData((prevData) => {
            return {
                ...prevData,
                meetingTimes: prevData.meetingTimes.splice(-1),
            };
        });
    };

    const handleDateChange = (
        e: React.ChangeEvent<HTMLSelectElement>,
        index: number
    ) => {
        const { value } = e.target;
        setData((prevState) => ({
            ...prevState,
            meetingTimes: prevState.meetingTimes.map((meeting, i) => {
                if (i === index) {
                    return {
                        ...meeting,
                        meetingDate: value,
                    };
                }
                return meeting;
            }),
        }));
    };

    const handleTimeRangeChange = (value: Value, index: number) => {
        setData((prevState) => ({
            ...prevState,
            meetingTimes: prevState.meetingTimes.map((meeting, i) => {
                if (i === index) {
                    return {
                        ...meeting,
                        timeRange: value,
                    };
                }
                return meeting;
            }),
        }));
    };

    const formFunctions = {
        setStep,
        handleChange,
        createCourse,
        handleFileChange,
        addMeetingTime,
        removeMeetingTime,
        handleDateChange,
        handleTimeRangeChange,
        data,
        file,
        rooms,
        courses
    };

    const formElements = [
        <CourseDetails {...formFunctions} key={0} />,
        <CourseList {...formFunctions} key={1} />,
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
