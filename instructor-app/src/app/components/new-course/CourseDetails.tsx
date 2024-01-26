import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import { useState, useEffect } from "react";

export default function CourseDetails({
    setStep,
    rooms,
    handleChange,
    data,
}: any) {
    const [preventSubmit, setPreventSubmit] = useState(true);

    useEffect(() => {
        if (
            data.courseCode === "" ||
            data.courseName === "" ||
            data.room.length === 0
        ) {
            setPreventSubmit(true);
        } else {
            setPreventSubmit(false);
        }
    }, [data]);

    return (
        <>
            <div className="card w-full bg-base-100 shadow-xl mt-16 py-6">
                <form className="card-body">
                    <div className="flex flex-col md:flex-row justify-between items-baseline pb-4">
                        <h2 className="card-title font-bold text-3xl mb-4 self-center">
                            <Link href={"/dashboard/courses"}>
                                <FaArrowLeft />
                            </Link>
                            Course Details
                        </h2>
                    </div>
                    <div className="md:px-16 flex flex-col gap-4">
                        <ul className="steps">
                            <li className="step step-primary">Details</li>
                            <li className="step">Class List</li>
                            <li className="step">Confirm</li>
                        </ul>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Course Code</span>
                            </label>
                            <input
                                type="text"
                                placeholder="enter a course code"
                                className="input input-bordered"
                                required
                                name="courseCode"
                                value={data.courseCode}
                                onChange={(e) => {
                                    handleChange(e);
                                }}
                                autoComplete="off"
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Course Name</span>
                            </label>
                            <input
                                type="text"
                                placeholder="enter a course name"
                                className="input input-bordered"
                                required
                                name="courseName"
                                value={data.courseName}
                                onChange={(e) => {
                                    handleChange(e);
                                }}
                                autoComplete="off"
                            />
                        </div>

                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Select Room(s)</span>
                            </div>
                            <select
                                multiple
                                className="select select-bordered py-4"
                                required
                                onChange={(e) => handleChange(e)}
                                name="room"
                            >
                                <option disabled defaultValue={""}>
                                    select a room for this course:
                                </option>
                                {Object(rooms).map((room: string, index: number) => (
                                    <option key={index}>{room}</option>
                                ))}
                            </select>
                        </label>

                        <div className="flex justify-between w-full mt-4 ">
                            <Link href={"/dashboard/courses"} className="btn btn-error w-28 ">
                                Cancel
                            </Link>
                            <button
                                className="btn btn-primary w-28"
                                disabled={preventSubmit}
                                onClick={(e) => {
                                    e.preventDefault();
                                    setStep(1);
                                }}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}
