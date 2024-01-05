'use client'

import { FaArrowLeft } from "react-icons/fa";
import Link from "next/link";

export default function Page() {


    return (<>
        <div className="min-h-screen bg-base-200">
            <div className="flex flex-col items-center xl:px-96 lg:px-64 px-16">


                <div className="card w-full bg-base-100 shadow-xl mt-16">
                    <form className="card-body">
                        <div className="flex flex-col md:flex-row justify-between items-baseline pb-4">

                            <h2 className="card-title font-bold text-3xl mb-4 self-center">
                                <Link href={'/dashboard/rooms'}>
                                    <FaArrowLeft />
                                </Link>
                                Room Details
                            </h2>
                        </div>
                        <div className="md:px-16 flex flex-col gap-4">
                            <ul className="steps">
                                <li className="step step-primary">Details</li>
                                <li className="step">Layout</li>
                                <li className="step">Confirm</li>

                            </ul>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Room Name</span>
                                </label>
                                <input type="text" placeholder="enter a room name" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Number of Seats</span>
                                </label>
                                <input type="number" defaultValue={1} className="input input-bordered" required min={1} max={100} />

                            </div>
                            <div className="flex justify-between w-full mt-4 ">
                                <Link href={'/dashboard/rooms'} className="btn btn-error w-28 ">Cancel</Link>
                                <button className="btn btn-primary w-28  ">Next</button>
                            </div>
                        </div>


                    </form>
                </div>

            </div>

        </div>

    </>)

}