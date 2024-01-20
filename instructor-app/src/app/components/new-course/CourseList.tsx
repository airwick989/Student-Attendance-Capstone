import { FaArrowLeft } from "react-icons/fa";

export default function CourseList({ setStep }: any) {
    return (
        <>
            <div className="card w-full bg-base-100 shadow-xl mt-16 py-6">
                <form className="card-body">
                    <div className="flex flex-col md:flex-row justify-between items-baseline pb-4">
                        <h2 className="card-title font-bold text-3xl mb-4 self-center">
                            <button onClick={() => setStep(0)}>
                                <FaArrowLeft />
                            </button>
                            Class List
                        </h2>
                    </div>
                    <div className="md:px-16 flex flex-col gap-4">
                        <ul className="steps">
                            <li className="step step-primary">Details</li>
                            <li className="step step-primary">Class List</li>
                            <li className="step">Confirm</li>
                        </ul>

                        <div className="flex justify-between w-full mt-4">
                            <button
                                className="btn btn-primary w-28"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setStep(0);
                                }}
                            >
                                Previous
                            </button>
                            <button
                                className="btn btn-primary w-28"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setStep(2);
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
