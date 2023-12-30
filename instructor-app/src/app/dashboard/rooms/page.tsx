import { FaEdit, FaPlus } from "react-icons/fa";
import Link from "next/link";

export default function Page() {
    const rooms = {};

    return (
        <>
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
                                        className={`${Object.keys(rooms).length == 0 ? `hidden` : ``
                                            } btn btn-outline btn-secondary`}
                                    >
                                        <FaEdit />
                                        <span className="hidden md:block">Edit Room</span>
                                    </button>
                                </div>
                            </div>
                            {Object.keys(rooms).length == 0 ? (
                                <>
                                    <p className="self-center text-lg mt-2">No rooms found.</p>
                                </>
                            ) : (
                                <>
                                    <div className="flex flex-col gap-2">
                                        <div className="collapse border border-base-300 bg-secondary hover:bg-gradient-to-tl hover:from-pink-200 p-2">
                                            <div className="collapse-title text-xl text-primary-content font-semibold">
                                                UA1350
                                            </div>
                                        </div>
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
