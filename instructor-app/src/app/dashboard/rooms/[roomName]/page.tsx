"use client";

import {
    useState,
    useEffect,
    Suspense,
    ButtonHTMLAttributes,
    ChangeEvent,
} from "react";
import { useRouter } from "next/navigation";
import { database } from "@/app/firebase";
import { FaArrowLeft } from "react-icons/fa";
import { onValue, ref } from "firebase/database";
import SeatComponent from "@/app/components/SeatComponent";
import Loading from "./loading";

export default function Page({ params }: { params: { roomName: string } }) {
    const [classMap, setClassMap] = useState([]);
    const [snapshotName, setSnapshotName] = useState("");
    const [sucessSnapshot, setSucessSnapshot] = useState(false);
    const [dimensions, setDimensions] = useState({ columns: 0, rows: 0 });
    const [activeClass, setActiveClass] = useState<
        string | { courseCode: string; courseName: string }
    >("");
    const [loading, setLoading] = useState(true);

    const router = useRouter();

    useEffect(() => {
        const query = ref(database, `Rooms/${params.roomName}`);
        return onValue(query, (snapshot) => {
            const data = snapshot.val();
            if (snapshot.exists()) {
                setClassMap(data.map.reverse());
                setDimensions(data.dimensions);
                setActiveClass(data?.activeClass);
                setLoading(false);
            }
            setLoading(false);
        });
    }, [params.roomName]);

    useEffect(() => {
        console.log(snapshotName);
    }, [snapshotName]);

    const isActiveClassObject = (
        obj: any
    ): obj is { courseCode: string; courseName: string } => {
        return (
            typeof obj === "object" && "courseCode" in obj && "courseName" in obj
        );
    };

    const handleSnapshot = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        await submitSnapshot();
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setSnapshotName(value);
    };

    const submitSnapshot = async () => {
        const classObject = isActiveClassObject(activeClass);

        if (classObject) {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/professor/createCourseSnapshot`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        courseCode: activeClass.courseCode,
                        room: params.roomName,
                        snapshotName: snapshotName,
                    }),
                }
            );
            if (response.ok) {
                setSucessSnapshot(true);
                setTimeout(() => {
                    setSucessSnapshot(false);
                }, 3000);
            }
        }
    };

    const emptyClass = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/professor/resetRoom/${params.roomName}`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
    };

    return (
        <>
            <div className="min-h-screen bg-base-200">
                <div className="flex flex-col items-center">
                    <div className="drawer drawer-end ">
                        <input
                            id="my-drawer-4"
                            type="checkbox"
                            className="drawer-toggle hidden"
                        />
                        <div className="drawer-content hidden">
                            <label
                                htmlFor="my-drawer-4"
                                className="drawer-button btn btn-primary"
                            ></label>
                        </div>
                        <div className="drawer-side z-10 mt-16 ">
                            <label
                                htmlFor="my-drawer-4"
                                aria-label="close sidebar"
                                className="drawer-overlay opacity-0"
                            ></label>
                            <div className="menu p-6 w-80 xl:w-96 min-h-screen bg-base-100 text-base-content rounded-lg overflow-hidden shadow-lg grid">
                                {activeClass && isActiveClassObject(activeClass) ? (
                                    <>
                                        <div className="flex flex-col gap-4">
                                            <div>
                                                <h2 className="text-3xl font-bold text-ellipsis overflow-hidden pb-4">
                                                    {activeClass.courseName}
                                                </h2>

                                                <h3 className="text-md font-semibold text-ellipsis overflow-hidden">
                                                    {activeClass.courseCode}
                                                </h3>
                                                <div className="divider"></div>
                                            </div>

                                            <div
                                                tabIndex={0}
                                                className="collapse collapse-arrow border border-base-300 bg-base-200"
                                            >
                                                <input type="checkbox" />
                                                <div className="collapse-title text-xl font-medium text-center px-0">
                                                    Class Snapshot
                                                </div>

                                                <div className="collapse-content">
                                                    <label className="form-control w-full max-w-xs">
                                                        <div className="label">
                                                            <span className="label-text">Snapshot Name</span>
                                                            <span className="label-text-alt">(optional)</span>
                                                        </div>

                                                        <input
                                                            type="text"
                                                            placeholder="enter a snapshot name"
                                                            className="input input-bordered w-full max-w-xs"
                                                            name="snapshotName"
                                                            onChange={(e) => handleChange(e)}
                                                        />
                                                        <div className="label">
                                                            <span className="label-text"></span>
                                                            {sucessSnapshot && (
                                                                <span className="label-text-alt text-success">
                                                                    Snapshot created.
                                                                </span>
                                                            )}
                                                        </div>
                                                        <button
                                                            className="btn btn-secondary mt-8 w-full max-w-xs"
                                                            onClick={(e) => handleSnapshot(e)}
                                                        >
                                                            Take Snapshot
                                                        </button>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="flex flex-col gap-4 justify-self-start ">
                                            <div>
                                                <h2 className="text-xl font-bold text-ellipsis overflow-hidden pb-4">
                                                    No Active Class
                                                </h2>

                                                <h3 className="text-md font-semibold text-ellipsis overflow-hidden">
                                                    There is no active class in this room, check back
                                                    later.
                                                </h3>
                                            </div>
                                        </div>
                                    </>
                                )}
                                <button className="btn w-full text-xl font-medium text-cente btn-error place-self-end mb-16" onClick={e=>emptyClass(e)}>
                                    Reset Class
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-row">
                        <div className="card w-full bg-base-100 shadow-xl my-32 p-6 z-0">
                            <div className="card-body">
                                <div className="flex items-center mb-4">
                                    <h2 className="card-title font-bold text-3xl  flex-grow">
                                        <button className="mr-3" onClick={() => router.back()}>
                                            <FaArrowLeft />
                                        </button>
                                        {`${params.roomName} ${isActiveClassObject(activeClass)
                                                ? `- ${activeClass.courseName}`
                                                : ""
                                            }`}
                                    </h2>
                                    <div className="drawer-content">
                                        <label
                                            htmlFor="my-drawer-4"
                                            className={`drawer-button btn btn-primary ${classMap && classMap.length > 0 && dimensions
                                                    ? ""
                                                    : "hidden"
                                                }`}
                                        >
                                            Class Controls
                                        </label>
                                    </div>
                                </div>

                                <input
                                    id="my-drawer-4"
                                    type="checkbox"
                                    className="drawer-toggle"
                                />

                                <Suspense fallback={<Loading />}>
                                    {!loading ? (
                                        classMap && classMap.length > 0 && dimensions ? (
                                            <>
                                                {" "}
                                                <div
                                                    className={`grid grid-cols-${dimensions.columns} gap-4 grid-rows-${dimensions.rows} self-center`}
                                                >
                                                    {classMap.map((seat, index) => {
                                                        // Reverse the string representation of the index and trim leading zeros

                                                        return (
                                                            <div key={index}>
                                                                <SeatComponent
                                                                    seatInfo={seat}
                                                                    index={classMap.length - index - 1}
                                                                />
                                                            </div>
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
                                                    Class not found.
                                                </div>
                                            </>
                                        )
                                    ) : (
                                        <Loading />
                                    )}
                                </Suspense>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
