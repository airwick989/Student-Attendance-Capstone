import { FaArrowLeft } from "react-icons/fa";
import { MouseEvent } from "react";

export default function CourseConfirm({ setStep, data, createCourse }: any) {
    const submitForm = async (e: MouseEvent) => {
        e.preventDefault();
        await createCourse();
    };

    return (
        <>
            <div className="card w-full bg-base-100 shadow-xl my-16 py-6">
                <form className="card-body">
                    <div className="flex flex-col md:flex-row justify-between items-baseline mb-4">
                        <h2 className="card-title font-bold text-3xl mb-4 self-center">
                            <button onClick={() => setStep(1)}>
                                <FaArrowLeft />
                            </button>
                            Confirm Course
                        </h2>
                    </div>
                    <div className="md:px-16 flex flex-col gap-4 ">
                        <ul className="steps mb-8">
                            <li className="step step-primary">Details</li>
                            <li className="step step-primary">Class List</li>
                            <li className="step step-primary">Confirm</li>
                        </ul>

                        <h2 className="card-title font-semibold text-2xl mt-4">Details</h2>

                        <div className="card bg-base-200">
                            <div className="card-body text-xl">
                                <div>Course Code: {data.courseCode} </div>
                                <div>Name: {data.courseName} </div>
                                <div>Room(s): {data.room.join(", ")} </div>
                            </div>
                        </div>
                        <div className="flex justify-between w-full mt-4 ">
                            <button
                                className="btn btn-primary w-28"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setStep(1);
                                }}
                            >
                                Previous
                            </button>
                            <button className="btn w-30" onClick={(e) => submitForm(e)}>
                                Create Course
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}