import Link from "next/link";
import React from "react";
import { FaArrowLeft } from "react-icons/fa";

type Log = {
  id: string;
  startTime: { _seconds: number; _nanoseconds: number };
  endTime: { _seconds: number; _nanoseconds: number };
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

const getAttendanceLogs = async (courseName: string) => {
  const res = await fetch(
    `http://localhost:5001/student-attendance-capst-7115c/us-central1/api/professor/getAllAttendanceLogs/${courseName}`,
    { next: { revalidate: 300 } }
  );

  if (!res.ok) {
    return [];
  }

  return await res.json();
};

export default async function Page({
  params,
}: {
  params: { courseName: string };
}) {
  const logs = await getAttendanceLogs(params.courseName);
  const sortedLogs = logs.sort((a: Log, b: Log) => {
    return b.endTime._seconds - a.endTime._seconds;
  });

  return (
    <>
      <div className="min-h-screen bg-base-200">
        <div className="flex flex-col items-center xl:px-96 lg:px-64 px-8">
          <div className="card w-full bg-base-100 shadow-xl mt-16 py-6">
            <div className="card-body">
              <div className="flex flex-col md:flex-row justify-between items-baseline pb-4">
                <h2 className="card-title font-bold text-3xl mb-4 self-center">
                  <Link href={"../"}>
                    <FaArrowLeft />
                  </Link>
                  Attendance Logs for {params.courseName}
                </h2>
              </div>
              {sortedLogs && sortedLogs.length > 0 ? (
                <div className="flex flex-col gap-4">
                  {sortedLogs.map((log: Log) => {
                    const formattedStartDay = dateConversion(
                      log.startTime._seconds
                    );
                    const formattedStartTime = timeConversion(
                      log.startTime._seconds
                    );
                    const formattedEndTime = timeConversion(
                      log.endTime._seconds
                    );
                    return (
                      <div
                        key={log.id}
                        className="card bg-primary text-primary-content hover:bg-gradient-to-tl hover:from-violet-400"
                      >
                        <Link
                          className="card-body"
                          href={`/dashboard/attendance/logs/${params.courseName}/view/${log.id}`}
                        >
                          <h2 className="card-title text-2xl">
                            {formattedStartDay}
                          </h2>
                          <p className="text-lg">
                            From {formattedStartTime} to {formattedEndTime}
                          </p>
                        </Link>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-center text-lg mt-2">
                  No attendance logs available for this course.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
