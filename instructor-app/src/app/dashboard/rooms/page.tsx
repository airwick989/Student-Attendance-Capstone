"use client";

import { useState, useEffect } from "react";
import { FaEdit, FaPlus, FaTrashAlt } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import Link from "next/link";
import Loading from "./loading";
import ConfirmDeleteRoom from "@/app/components/ConfirmDeleteRoom";

export default function Page() {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch(
                    "http://localhost:5001/student-attendance-capst-7115c/us-central1/api/professor/getAllRoomNames",
                    { next: { revalidate: 5 } }
                );
                const data = await res.json();
                setRooms(data);
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
                <div className="flex flex-col items-center xl:px-96 lg:px-64 px-16">
                    <div className="card w-full bg-base-100 shadow-xl mt-16 p-6 ">
                        <div className="card-body">
                            <div className="flex flex-col md:flex-row justify-between items-baseline pb-4">
                                <h2 className="card-title font-bold text-3xl mb-4 self-center">
                                    My Rooms
                                </h2>
                                <div className="flex gap-2 self-center">
                                    <Link
                                        href={"new-room"}
                                        className="btn btn-outline btn-primary"
                                    >
                                        <FaPlus />
                                        <span className="hidden md:block">New Room</span>
                                    </Link>
                                    <button
                                        className={`${Object.keys(rooms).length == 0 && !loading ? `hidden` : ``
                                            } btn btn-outline w-max btn-secondary ${editMode && `btn-error`
                                            }`}
                                        onClick={() => {
                                            setEditMode(!editMode);
                                        }}
                                    >
                                        {editMode ? (
                                            <>
                                                <ImCross />
                                                <span className="hidden md:block">Cancel</span>
                                            </>
                                        ) : (
                                            <>
                                                <FaEdit />{" "}
                                                <span className="hidden md:block">Manage Rooms</span>
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>

                            {Object.keys(rooms).length == 0 && !loading ? (
                                <>
                                    <p className="self-center text-lg mt-2">No rooms found.</p>
                                </>
                            ) : (
                                <>
                                    <div className="flex flex-col gap-2">
                                        {Object.values(rooms).map((room, index) => {
                                            if (editMode) {
                                                return (
                                                    <div
                                                        className="collapse border border-base-300 bg-base-300 p-2 "
                                                        key={index}
                                                    >
                                                        <ConfirmDeleteRoom
                                                            resource={`${room}`}
                                                            setResource={setRooms}
                                                            resourceList={rooms}
                                                        />
                                                        <div className="collapse-title text-xl font-medium flex items-center flex-col  md:flex-row px-4">
                                                            <p className="mb-4 md:mb-0">{`${room}`}</p>

                                                            <div className="flex gap-2">
                                                                <Link
                                                                    className="btn btn-secondary btn-outline"
                                                                    href={`/dashboard/edit-room/${room}`}
                                                                >
                                                                    <FaEdit />
                                                                    <span className="hidden md:block">Edit</span>
                                                                </Link>
                                                                <button
                                                                    className="btn btn-error btn-outline"
                                                                    onClick={() => {
                                                                        const modal = document.getElementById(
                                                                            `${room}`
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
                                                <Link
                                                    href={`rooms/${room}`}
                                                    className="collapse border border-base-300 bg-secondary hover:bg-gradient-to-tl hover:from-pink-200 p-2"
                                                    key={index}
                                                >
                                                    <div className="collapse-title text-xl font-medium flex items-center flex-col gap-2 md:flex-row text-primary-content">
                                                        <p className="">{`${room}`}</p>
                                                    </div>
                                                </Link>
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
