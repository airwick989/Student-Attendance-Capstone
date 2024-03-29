"use client";

import Loading from "@/app/dashboard/courses/loading";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import SeatComponent from "@/app/components/SeatComponent";
import { MdDownload } from "react-icons/md";

type Snapshot = {
  name: string;
  courseRoom: string[];
  dimensions: {
    columns: number;
    rows: number;
  };
  roomMap: {
    [key: string]: string | {
      studentNumber: string;
      fullName: string;
    };
  };
  timeStamp: {
    _seconds: number;
  };

};

interface Seat {
  fullName: string;
  prefName: string;
  pronouns: string;
  studentNumber: string;
  profilePicture: string;
}

type SeatInfo = "none" | Seat;

const getSnapshot = async (courseName: string, snapshotID: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/professor/getCourseSnapshots/${courseName}/${snapshotID}`,
    { next: { revalidate: 300 } }
  );

  if (!res.ok) {
    return [];
  }

  return await res.json();
};

const downloadSnapshot = async (courseName: string, snapshotID: string, snapshotName: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/professor/downloadSnapshot/${courseName}/${snapshotID}`,
    { next: { revalidate: 300 } }
  );

  if (!res.ok) {
    console.error("Failed to download snapshot");
  }

  const formattedName = snapshotName.replace(/ /g, "_");

  const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute(
        "download",
        `${formattedName}_${courseName}_${snapshotID}.csv`
    );
    document.body.appendChild(link);
    link.click();

    if (link.parentNode) {
        link.parentNode.removeChild(link);
    }
    URL.revokeObjectURL(url);
}

const dateConversion = (seconds: number) => {
  const date = new Date(seconds * 1000);
  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    minute: "numeric",
    hour: "numeric",
  });
};

const getPresentStudents = (classList: {
  [key: string]: string | { studentNumber: string; fullName: string };
}) => {
  const newObj: { [key: string]: { studentNumber: string; fullName: string } } =
    {};
  for (const [key, value] of Object.entries(classList)) {
    if (typeof value !== "string") {
      newObj[key] = value;
    }
  }
  return newObj;
};

export default function Page({
  params,
}: {
  params: { courseName: string; timeStamp: string };
}) {
  const [snapshot, setSnapshot] = useState<Snapshot | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function fetchData() {
      const snapshot = await getSnapshot(params.courseName, params.timeStamp);
      setSnapshot(snapshot);
      setLoading(false);
    }
    fetchData();
  }, [params.courseName, params.timeStamp]);
  const seconds = snapshot && snapshot.timeStamp && snapshot.timeStamp._seconds;
  const date = dateConversion(seconds || 0);
  const presentStudents = getPresentStudents(snapshot?.roomMap || {});
  const courseRoom = snapshot?.courseRoom || '';

  return (
    <>
    {loading && <Loading />}
      <div className="min-h-screen bg-base-200">
        <div className="flex flex-col items-center">
          <div className="drawer drawer-end">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content"></div>
            <div className="drawer-side z-10 mt-16">
              <label
                htmlFor="my-drawer-4"
                aria-label="close sidebar"
                className="drawer-overlay opacity-0"
              ></label>
              <div className="menu p-6 w-80 xl:w-96 min-h-screen bg-base-100 text-base-content rounded-lg overflow-hidden shadow-lg grid">
                <div className="flex flex-col gap-4">
                  <div>
                    <h2 className="text-3xl font-bold text-ellipsis overflow-hidden pb-4">
                      {params.courseName} at {courseRoom}
                    </h2>

                    <h3 className="text-md font-semibold text-ellipsis overflow-hidden">
                      {date}
                    </h3>
                    <div className="divider"></div>
                    <div
                      tabIndex={0}
                      className="collapse collapse-arrow border border-base-300 bg-base-200"
                    >
                      <input type="checkbox" />
                      <div className="collapse-title text-xl font-medium text-center px-0">
                        Students Attended ({Object.keys(presentStudents).length}
                        )
                      </div>

                      <div className="collapse-content">
                        {Object.keys(presentStudents).length == 0 ? (
                          <p className="text-center text-sm">
                            No students found in this snapshot.
                          </p>
                        ) : (
                          Object.keys(presentStudents).map((seat) => {
                            return (
                              <div
                                key={seat}
                                className="flex flex-row justify-between items-center"
                              >
                                <p className="text-sm">
                                  {presentStudents[seat].fullName}
                                </p>
                                <p className="text-sm">
                                  {presentStudents[seat].studentNumber}
                                </p>
                              </div>
                            );
                          })
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <button className="btn w-full text-xl font-medium text-center btn-secondary place-self-end mb-16" onClick={async()=>{
                  await downloadSnapshot(params.courseName, params.timeStamp, snapshot?.name || "Error");
                }}>
                <MdDownload />
                  Download Snapshot
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-row">
            <div className="card w-full bg-base-100 shadow-xl my-32 p-6 z-0">
              <div className="card-body">
                <div className="flex items-center mb-4">
                  <h2 className="card-title font-bold text-3xl  flex-grow">
                    <Link className="mr-3" href={`../../${params.courseName}`}>
                      <FaArrowLeft />
                    </Link>
                    {snapshot && snapshot.name || "Error"}
                  </h2>
                  <div className="drawer-content">
                    <label
                      htmlFor="my-drawer-4"
                      className={`drawer-button btn btn-primary ${snapshot && snapshot.roomMap ? "" : "hidden"
                        }`}
                    >
                      Snapshot Details
                    </label>
                  </div>
                </div>              
                  {snapshot && snapshot.roomMap ? (
                    <>
                      <div
                        className={`grid grid-cols-${snapshot.dimensions.columns} gap-4 grid-rows-${snapshot.dimensions.rows} self-center`}
                      >
                        {Object.keys(snapshot.roomMap)
                          .reverse()
                          .map((seat: any) => {
                            return (
                              <SeatComponent
                                index={seat}
                                key={seat}
                                seatInfo={typeof snapshot.roomMap[seat] === 'string' ? 'none' : snapshot.roomMap[seat] as SeatInfo}
                              />
                            );
                          })}
                      </div>
                      <div className="divider"></div>
                      <p className="text-center font-semibold text-xl pb-6">
                        Front of Class
                      </p>
                    </>
                  ) : (
                    <>
                      <div className={`flex w-96 self-center`}>
                        Snapshot not found.
                      </div>
                    </>
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
