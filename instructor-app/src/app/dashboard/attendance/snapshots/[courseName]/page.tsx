"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FaArrowLeft, FaEdit } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import Loading from "./loading";

type Snapshot = {
  id: string;
  name: string;
  date: { _seconds: number; _nanoseconds: number };
};

async function getSnapshots(courseName: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/professor/getCourseSnapshots/${courseName}`,
    { next: { revalidate: 300 } }
  );

  if (!res.ok) {
    return [];
  }

  return await res.json();
}

async function deleteSnapshot(courseName: string, timeStamp: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/professor/deleteSnapshot/${courseName}/${timeStamp}`,
    {
      method: "DELETE",
    }
  );
}

export default function Page({ params }: { params: { courseName: string } }) {
  const [snapshots, setSnapshots] = useState<Snapshot[]>([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const data = await getSnapshots(params.courseName);
      setSnapshots(data);
      setLoading(false);
    }
    fetchData();
  }, [params.courseName]);

  const dateConversion = (seconds: number) => {
    const date = new Date(seconds * 1000);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      minute: "numeric",
      hour: "numeric",
    });
  };

  return (
    <>
      {loading && <Loading />}
      <div className="min-h-screen bg-base-200">
        <div className="flex flex-col items-center xl:px-96 lg:px-64 px-16">
          <div className="card w-full bg-base-100 shadow-xl mt-32 py-6">
            <div className="card-body">
              <div className="flex flex-col md:flex-row justify-between items-baseline pb-4">
                <h2 className="card-title font-bold text-3xl mb-4 self-center">
                  <Link href={"../"}>
                    <FaArrowLeft />
                  </Link>
                  Snapshots for {params.courseName}
                </h2>
                <div className="self-end">
                  <button
                    className={`btn btn-error btn-outline w-max
                    ${!editMode || snapshots.length == 0 ? "hidden" : ""}`}
                    onClick={() => setEditMode(!editMode)}
                  >
                    <ImCross />
                    Cancel
                  </button>
                  <button
                    className={`btn btn-secondary btn-outline w-max 
                    ${editMode || snapshots.length == 0 ? "hidden" : ""}`}
                    onClick={() => setEditMode(!editMode)}
                  >
                    <FaEdit />
                    Manage Logs
                  </button>
                </div>
              </div>

              {snapshots && snapshots.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {snapshots.map((snapshot: Snapshot, index: number) => {
                    const formattedDate = dateConversion(
                      snapshot.date._seconds
                    );
                    if (editMode) {
                      return (
                        <>
                          <div className="card bg-base-200">
                            <div className="card-body">
                              <h2 className="card-title">{snapshot.name}</h2>
                              <p>Snapshot for {formattedDate}</p>
                              <div className="card-actions justify-end mt-2">
                                <button
                                  className="btn btn-error btn-outline"
                                  onClick={async () => {
                                    await deleteSnapshot(
                                      params.courseName,
                                      snapshot.id
                                    );
                                    setSnapshots(
                                      snapshots.filter(
                                        (snap) => snap.id !== snapshot.id
                                      )
                                    );
                                  }}
                                >
                                  Delete Snapshot
                                </button>
                              </div>
                            </div>
                          </div>
                        </>
                      );
                    }
                    return (
                      <Link
                        className={`card bg-secondary text-primary-content hover:bg-gradient-to-tl hover:from-pink-200 ${editMode && "hidden"
                          }`}
                        href={`./${params.courseName}/view/${snapshot.id}`}
                        key={index}
                      >
                        <div className="card-body">
                          <h2 className="card-title">{snapshot.name}</h2>
                          <p>Snapshot for {formattedDate}</p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              ) : (
                <p className="text-center text-lg mt-2">
                  No snapshots available for this course.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
