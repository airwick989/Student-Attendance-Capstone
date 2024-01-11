"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter } from "next/navigation";
import { database } from "@/app/firebase";
import { FaArrowLeft } from "react-icons/fa";
import { onValue, ref } from "firebase/database";
import SeatComponent from "@/app/components/SeatComponent";
import Loading from "./loading";

export default function Page({ params }: { params: { roomName: string } }) {
    const [classMap, setClassMap] = useState([]);
    const [loading, setLoading] = useState(true);

    const router = useRouter();

    useEffect(() => {
        const query = ref(database, `Rooms/${params.roomName}`);
        return onValue(query, (snapshot) => {
            const data = snapshot.val();
            if (snapshot.exists()) {
                setClassMap(data.map.reverse());
                setLoading(false);
            }
            setLoading(false);
        });
    }, [params.roomName]);

    return (
        <>
            <div className="min-h-screen bg-base-200">
                <div className="flex flex-col items-center  lg:px-64 px-16">
                    <div className="card w-full bg-base-100 shadow-xl mt-16 p-6 ">
                        <div className="card-body">
                            <h2 className="card-title font-bold text-3xl mb-4">
                                <button className="mr-3" onClick={() => router.back()}>
                                    <FaArrowLeft />
                                </button>
                                {params.roomName}
                            </h2>
                            <Suspense fallback={<Loading/>}>
                                {!loading ? (
                                    classMap && classMap.length > 0 ? (
                                        <>
                                            {" "}
                                            <div className="grid grid-cols-7 gap-6 self-center">
                                                {classMap.map((seat, index) => (
                                                    <div
                                                        key={index}
                                                        className={index % 6 === 2 ? "col-span-2" : ""}
                                                    >
                                                        <SeatComponent seatInfo={seat} />
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="divider"></div>
                                            <p className="text-center font-semibold text-xl pb-6">
                                                Front of Class
                                            </p>
                                        </>
                                    ) : (
                                        <>Class not found.</>
                                    )
                                ) : (<Loading />)}
                            </Suspense>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}
