"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaEdit } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import Loading from "./loading";

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
  const data = await res.json();

  return data.sort((a: Log, b: Log) => {
    return b.endTime._seconds - a.endTime._seconds;
  });
};

const deleteLog = async (courseName: string, timeStamp: string) => {
  const res = await fetch(
    `http://localhost:5001/student-attendance-capst-7115c/us-central1/api/professor/deleteLog/${courseName}/${timeStamp}`,
    {
      method: "DELETE",
    }
  );
};

export default function Page({ params }: { params: { courseName: string } }) {
  const [logs, setLogs] = useState<Log[]>([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    (async () => {
      const logs = await getAttendanceLogs(params.courseName);
      setLogs(logs);
      setLoading(false);
    })();
  }, [params.courseName]);

  return (
    <>
      {loading && <Loading />}
      <div className="min-h-screen bg-base-200">
        <div className="flex flex-col items-center xl:px-96 lg:px-64 px-8">
          <div className="card w-full bg-base-100 shadow-xl my-32 py-6">
            <div className="card-body">
              <div className="flex flex-col md:flex-row justify-between items-baseline pb-4">
                <h2 className="card-title font-bold text-3xl mb-4 self-center">
                  <Link href={"../"}>
                    <FaArrowLeft />
                  </Link>
                  Attendance Logs for {params.courseName}
                </h2>
                <div className="self-end">
                  <button
                    className={`btn btn-error btn-outline w-max ${!editMode || logs.length == 0 ? "hidden" : ""
                      }`}
                    onClick={() => {
                      setEditMode(!editMode);
                    }}
                  >
                    <ImCross />
                    Cancel
                  </button>
                  <button
                    className={`btn btn-secondary btn-outline w-max ${editMode || logs.length == 0 ? "hidden" : ""
                      }`}
                    onClick={() => {
                      setEditMode(!editMode);
                    }}
                  >
                    <FaEdit />
                    Manage Logs
                  </button>
                </div>
              </div>
              {logs && logs.length > 0 ? (
                <div className="flex flex-col gap-4">
                  {logs.map((log: Log) => {
                    const formattedStartDay = dateConversion(
                      log.startTime._seconds
                    );
                    const formattedStartTime = timeConversion(
                      log.startTime._seconds
                    );
                    const formattedEndTime = timeConversion(
                      log.endTime._seconds
                    );
                    if (editMode) {
                      return (
                        <div key={log.id} className="card bg-base-200 ">
                          <div className="card-body">
                            <h2 className="card-title text-2xl">
                              {formattedStartDay}
                            </h2>
                            <div className="flex flex-col md:flex-row gap-4">
                              <p className="text-lg">
                                From {formattedStartTime} to {formattedEndTime}
                              </p>
                              <button
                                className="btn btn-outline btn-error"
                                onClick={async () => {
                                  await deleteLog(params.courseName, log.id);
                                  setLogs(logs.filter((l) => l.id !== log.id));
                                }}
                              >
                                Delete Log
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    }
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
