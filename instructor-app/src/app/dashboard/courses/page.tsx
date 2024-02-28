"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FaEdit, FaPlus, FaTrashAlt } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import Loading from "./loading";
import ConfirmDeleteCourse from "@/app/components/ConfirmDeleteCourse";
import useTimeValidation from "@/app/hooks/useTimeValidation";

type MeetingTimes = {
    [key: string]: {
        meetingDate: string;
        timeRange: string[];
    };
};

interface Course {
    courseName: string;
    Room: string[];
    meetingTimes: MeetingTimes;
}

interface Courses {
    [classKey: string]: Course;
}

export default function Page() {
    const [courses, setCourses] = useState<Courses>({});
    const [editMode, setEditMode] = useState(false);
    const [loading, setLoading] = useState(true);
    const {timeConversion} = useTimeValidation();

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch(
                    "http://localhost:5001/student-attendance-capst-7115c/us-central1/api/professor/getAllClasses",
                    { next: { revalidate: 5 } }
                );
                const data = await res.json();
                setCourses(data);
                setLoading(false);
            } catch (error) {
                console.error("Error:", error);
                setLoading(false);
            }
        })();
    }, []);

    return (
        <>
            {loading && <Loading />}
            <div className="min-h-screen bg-base-200">
                <div className="flex flex-col items-center mx-16 lg:mx-64 min-w-md">
                    <div className="card w-full bg-base-100 shadow-xl mt-16 p-6">
                        <div className="card-body">
                            <div className="flex flex-col md:flex-row justify-between items-baseline pb-4 overflow-auto">
                                <h2 className="card-title font-bold text-3xl mb-4 self-center">
                                    My Courses
                                </h2>
                                <div className="flex gap-2 self-center">
                                    <Link
                                        href={"new-course"}
                                        className="btn btn-outline btn-primary"
                                    >
                                        <FaPlus />
                                        <span className="hidden md:block">New Course</span>
                                    </Link>
                                    {courses && (
                                        <button
                                            className={`${Object.keys(courses).length == 0 && !loading
                                                    ? `hidden`
                                                    : ""
                                                } btn btn-outline w-max btn-secondary ${editMode && `btn-error`
                                                }`}
                                            onClick={() => setEditMode(!editMode)}
                                        >
                                            {editMode ? (
                                                <>
                                                    <ImCross />
                                                    <span className="hidden md:block">Cancel</span>
                                                </>
                                            ) : (
                                                <>
                                                    <FaEdit />{" "}
                                                    <span className="hidden md:block">
                                                        Manage Courses
                                                    </span>
                                                </>
                                            )}
                                        </button>
                                    )}
                                </div>
                            </div>

                            {!courses || (Object.keys(courses).length == 0 && !loading) ? (
                                <>
                                    <p className="self-center text-lg mt-2">No classes found.</p>
                                </>
                            ) : (
                                <>
                                    <div className="flex flex-col gap-2">
                                        {Object.keys(courses).map((classKey, index) => {
                                            if (editMode) {
                                                return (
                                                    <div
                                                        className="collapse border border-base-300 bg-base-300 p-2 "
                                                        key={index}
                                                    >
                                                        <ConfirmDeleteCourse
                                                            resource={classKey}
                                                            setResource={setCourses}
                                                        />
                                                        <div className="collapse-title text-2xl font-medium flex items-center flex-col  md:flex-row px-4">
                                                            <p className="mb-4 md:mb-0">{`${classKey} - ${courses[classKey].courseName}`}</p>
                                                            <div className="flex gap-2">
                                                                <Link
                                                                    className="btn btn-secondary btn-outline"
                                                                    href={`/dashboard/edit-course/${classKey}`}
                                                                >
                                                                    <FaEdit />
                                                                    <span className="hidden md:block">Edit</span>
                                                                </Link>
                                                                <button
                                                                    className="btn btn-error btn-outline"
                                                                    onClick={() => {
                                                                        const modal = document.getElementById(
                                                                            `${classKey}`
                                                                        ) as HTMLDialogElement | null;
                                                                        if (modal) {
                                                                            modal.showModal();
                                                                        }
                                                                    }}
                                                                >
                                                                    <FaTrashAlt />
                                                                    <span className="hidden md:block">
                                                                        Delete
                                                                    </span>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            }

                                            return (
                                                <div
                                                    className="collapse collapse-arrow border border-base-300 bg-primary hover:bg-gradient-to-tl hover:from-violet-400 p-2"
                                                    key={index}
                                                >
                                                    <input type="checkbox" />

                                                    <div className="collapse-title text-2xl text-primary-content font-semibold">
                                                        {`${classKey} - ${courses[classKey].courseName}`}
                                                    </div>
                                                    <div className="collapse-content font-medium text-secondary-content self-center">
                                                        <div className="flex flex-col gap-3">
                                                            <p className="font-semibold text-xl underline">
                                                                Scheduled Time(s):
                                                            </p>
                                                            {courses[classKey].meetingTimes &&
                                                                Object.values(
                                                                    courses[classKey].meetingTimes
                                                                ).map((meetingTime, index) => {
                                                                    const start = timeConversion(
                                                                        meetingTime.timeRange[0]
                                                                    );
                                                                    const end = timeConversion(
                                                                        meetingTime.timeRange[1]
                                                                    );
                                                                    return (
                                                                        <p key={index}>
                                                                            {meetingTime.meetingDate} from {start} to{" "}
                                                                            {end}
                                                                        </p>
                                                                    );
                                                                })}

                                                            {courses[classKey].Room &&
                                                                typeof courses[classKey].Room === "object" &&
                                                                Object.values(courses[classKey].Room).map(
                                                                    (room, index) =>
                                                                        room && (
                                                                            <Link
                                                                                href={`./rooms/${room}`}
                                                                                className="btn btn-wide self-center  mt-3"
                                                                                key={index}
                                                                            >
                                                                                {`${room}`}
                                                                            </Link>
                                                                        )
                                                                )}
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
