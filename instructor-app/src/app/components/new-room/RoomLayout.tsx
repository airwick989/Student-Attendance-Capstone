import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";

export default function RoomLayout({ setStep, handleChange, data }: any) {
    const [preventSubmit, setPreventSubmit] = useState(false);

    const dataRange = (value: number, min: number, max: number) =>
        value > max || value < min;

    useEffect(() => {
        if (
            dataRange(data.numSeats, 1, 100) ||
            dataRange(data.dimensions.rows, 1, 10) ||
            dataRange(data.dimensions.columns, 1, 10)
        ) {
            setPreventSubmit(true);
        } else if (data.numSeats > data.dimensions.rows * data.dimensions.columns) {
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
                            <button onClick={() => setStep(0)}>
                                <FaArrowLeft />
                            </button>
                            Room Layout
                        </h2>
                    </div>
                    <div className="md:px-16 flex flex-col gap-4">
                        <ul className="steps">
                            <li className="step step-secondary">Details</li>
                            <li className="step step-secondary">Layout</li>
                            <li className="step">Confirm</li>
                        </ul>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Number of Seats</span>
                            </label>
                            <input
                                type="number"
                                className="input input-bordered"
                                value={data.numSeats}
                                required
                                name="numSeats"
                                min={1}
                                max={data.dimensions.rows * data.dimensions.columns}
                                onChange={(e) => {
                                    handleChange(e);
                                }}
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Rows</span>
                            </label>
                            <input
                                type="number"
                                className="input input-bordered"
                                value={data.dimensions.rows}
                                required
                                name="dimensions.rows"
                                min={1}
                                max={10}
                                onChange={(e) => {
                                    handleChange(e);
                                }}
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Columns</span>
                            </label>
                            <input
                                type="number"
                                className="input input-bordered"
                                name="dimensions.columns"
                                value={data.dimensions.columns}
                                required
                                min={1}
                                max={10}
                                onChange={(e) => {
                                    handleChange(e);
                                }}
                            />
                        </div>
                        <div className="flex justify-between w-full mt-4">
                            <button
                                className="btn btn-secondary w-28"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setStep(0);
                                }}
                            >
                                Previous
                            </button>
                            <button
                                className="btn btn-secondary w-28"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setStep(2);
                                }}
                                disabled={preventSubmit}
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
