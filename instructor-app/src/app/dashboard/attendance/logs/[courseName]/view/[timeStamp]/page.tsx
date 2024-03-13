import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

type Log = {
    timeStamp: number;
    studentNumber: string;
  };
  

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

export default async function Page({
    params,
}: {
    params: { courseName: string; timeStamp: string };
}) {
    const timeStamp = params.timeStamp;
    const cleanedTimeStamp = timeStamp.replace("%26", "&");
    const logs = await getAttendanceLogs(params.courseName, cleanedTimeStamp);

    if (logs.length === 0) {
        return (
            <div className="min-h-screen flex  justify-center bg-base-200">
                <div className="flex flex-col items-center xl:px-96 lg:px-64 px-8">
                    <div className="card  bg-base-100 shadow-xl mt-16 py-6 w-96">
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
        );
    }

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
                    <div className="card w-full bg-base-100 shadow-xl my-16 py-6 ">
                        <div className="card-body">
                            <div className="flex flex-col ">
                                <div className="flex justify-between items-baseline">
                                    <h2 className="card-title font-bold text-3xl self-center">
                                        <Link href={`../../${params.courseName}`}>
                                            <FaArrowLeft />
                                        </Link>
                                        Attendance Report for {formattedStartDay}
                                    </h2>
                                </div>

                                <div>
                                    <p className="font-normal text-lg ml-9 mt-2">
                                        {formattedStartTime}-{formattedEndTime}
                                    </p>
                                </div>
                                <div className="divider"></div>
                            </div>

                            <div className="card bg-base-200 mb-4">
                                <div className="card-body">
                                    <h3 className="card-title font-bold text-2xl">Overview</h3>

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

                                    {sortedLogs.map((log: Log, index:number) => {
                                        const formattedTime = timeConversion(log.timeStamp/1000);
                                        return (
                                            <div key={index}>
                                                <div className="flex">
                                                    <div className="flex-grow">{formattedTime}</div>
                                                    <div className="flex-grow-0">{log.studentNumber}</div>
                                                </div>
                                            </div>
                                        );
                                    })}

                                    {sortedLogs.length === 0 && <p className="text-center">No logs available.</p>}
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
