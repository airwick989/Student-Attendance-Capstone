"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { MdDownload } from "react-icons/md";
import Loading from "../../loading";

type Log = {
    timeStamp: number;
    studentNumber: string;
};

type AttendanceLog =
    | {
        startTime: { _seconds: number };
        endTime: { _seconds: number };
        totalStudents: number;
        attendance: number;
        logs: Log[];
    }
    | [];

const getAttendanceLogs = async (courseName: string, timeStamp: string) => {
    const res = await fetch(
        `http://localhost:5001/student-attendance-capst-7115c/us-central1/api/professor/getAllAttendanceLogs/${courseName}/${timeStamp}`,
        { next: { revalidate: 1800 } }
    );

    if (!res.ok) {
        return [];
    }

    return await res.json();
};

const downloadLog = async (courseName: string, timeStamp: string, startTime: number) => {
    const res = await fetch(
        `http://localhost:5001/student-attendance-capst-7115c/us-central1/api/professor/downloadAttendance/${courseName}/${timeStamp}`,
        { next: { revalidate: 1800 } }
    );
    if (!res.ok) {
        console.error("Error:", res);
        return;
    }

    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const courseDate = new Date(startTime * 1000).toLocaleDateString("en-US");
    link.href = url;
    link.setAttribute(
        "download",
        `attendance_log_${courseName}_${courseDate.replace(/\//g, "_")}.csv`
    );
    document.body.appendChild(link);
    link.click();

    if (link.parentNode) {
        link.parentNode.removeChild(link);
    }
    URL.revokeObjectURL(url);
};

const dateConversion = (seconds: number) => {
    const date = new Date(seconds * 1000);
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
};

const timeConversion = (seconds: number) => {
    const date = new Date(seconds * 1000);
    return date.toLocaleTimeString("en-US");
};

export default function Page({
    params,
}: {
    params: { courseName: string; timeStamp: string };
}) {
    const timeStamp = params.timeStamp;
    const cleanedTimeStamp = timeStamp.replace("%26", "&");
    const [logs, setLogs] = useState<AttendanceLog>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLogs = async () => {
            const temp = await getAttendanceLogs(params.courseName, cleanedTimeStamp);
            setLogs(temp);
            setLoading(false);
        };
        fetchLogs();
    }, [cleanedTimeStamp, params.courseName]);

    loading && <Loading />;
    if (!loading) {
        if (Array.isArray(logs) && logs.length === 0) {
            return (
                <>
                    <div className="min-h-screen flex  justify-center bg-base-200">
                        <div className="flex flex-col items-center xl:px-96 lg:px-64 px-8">
                            <div className="card  bg-base-100 shadow-xl mt-32 py-6 w-96">
                                <div className="card-body">
                                    <div className="flex flex-col pb-6 ">
                                        <div className="flex justify-between items-baseline">
                                            <h2 className="card-title font-bold text-3xl self-center">
                                                <Link href={`/dashboard/attendance`}>
                                                    <FaArrowLeft />
                                                </Link>
                                                Error
                                            </h2>
                                        </div>
                                    </div>
                                    <div className="self-center text-lg">
                                        Attendance log not found.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            );
        } else if (!Array.isArray(logs)) {
            const formattedStartDay = dateConversion(logs.startTime._seconds);
            const formattedStartTime = timeConversion(logs.startTime._seconds);
            const formattedEndTime = timeConversion(logs.endTime._seconds);
            const sortedLogs = logs.logs.sort((a: Log, b: Log) => {
                return b.timeStamp - a.timeStamp;
            });

            return (
                <>
                    <div className="min-h-screen bg-base-200">
                        <div className="flex flex-col items-center xl:px-96 lg:px-64 px-8">
                            <div className="card w-full bg-base-100 shadow-xl my-32 py-6 ">
                                <div className="card-body">
                                    <div className="flex flex-col ">
                                        <div className="flex justify-between items-baseline">
                                            <h2 className="card-title font-bold text-3xl self-center">
                                                <Link href={`../../${params.courseName}`}>
                                                    <FaArrowLeft />
                                                </Link>
                                                Attendance Report for {formattedStartDay}
                                            </h2>

                                            <div className="hidden md:block">
                                                <button
                                                    className="btn btn-outline btn-primary flex w-max"
                                                    onClick={async () => {
                                                        await downloadLog(
                                                            params.courseName,
                                                            cleanedTimeStamp,
                                                            logs.startTime._seconds
                                                        );
                                                    }}
                                                >
                                                    <MdDownload />
                                                    Download Report
                                                </button>
                                            </div>
                                        </div>

                                        <div>
                                            <p className="font-normal text-lg ml-9 mt-2">
                                                {formattedStartTime}-{formattedEndTime}
                                            </p>
                                        </div>

                                        <div className="flex justify-end md:hidden mt-6">
                                            <button
                                                className="btn btn-outline btn-primary flex"
                                                onClick={async () => {
                                                    await downloadLog(
                                                        params.courseName,
                                                        cleanedTimeStamp,
                                                        logs.startTime._seconds
                                                    );
                                                }}
                                            >
                                                <MdDownload />
                                                Download Report
                                            </button>
                                        </div>

                                        <div className="divider"></div>
                                    </div>

                                    <div className="card bg-base-200 mb-4">
                                        <div className="card-body">
                                            <h3 className="card-title font-bold text-2xl">
                                                Overview
                                            </h3>

                                            <div className="stats stats-vertical lg:stats-horizontal bg-base-200">
                                                <div className="stat">
                                                    <div className="stat-title">Total Students</div>
                                                    <div className="stat-value">{logs.totalStudents}</div>
                                                </div>

                                                <div className="stat">
                                                    <div className="stat-title">Attendance Rate</div>
                                                    <div className="stat-value">
                                                        {Math.round(logs.attendance * 100)}%
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="card bg-base-200">
                                        <div className="card-body">
                                            <h3 className="card-title font-bold text-2xl">Logs</h3>
                                            <div className="divider mt-0"></div>
                                            <div className="flex font-semibold text-lg">
                                                <div className="flex-grow">Time</div>
                                                <div className="flex-grow-0">Student Number</div>
                                            </div>
                                            <div className="flex flex-col max-h-36 overflow-auto">
                                                {sortedLogs.map((log: Log, index: number) => {
                                                    const formattedTime = timeConversion(
                                                        log.timeStamp / 1000
                                                    );
                                                    return (
                                                        <div key={index}>
                                                            <div className="flex">
                                                                <div className="flex-grow">{formattedTime}</div>
                                                                <div className="flex-grow-0">
                                                                    {log.studentNumber}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    );
                                                })}

                                                {sortedLogs.length === 0 && (
                                                    <p className="text-center">No logs available.</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            );
        }
    }
}
