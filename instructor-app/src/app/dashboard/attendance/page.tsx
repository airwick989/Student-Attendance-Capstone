"use client";

export default function Page() {
    return (<>
        <div className="min-h-screen bg-base-200">
            <div className="flex flex-col items-center mx-16 lg:mx-64 min-w-md">
                <div className="card w-full bg-base-100 shadow-xl mt-16 p-6 ">
                    <div className="card-body">
                        <div className="flex flex-col md:flex-row justify-between items-baseline pb-4 overflow-auto">
                            <h2 className="card-title font-bold text-3xl mb-4 self-center">
                                Attendance
                            </h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>);
};