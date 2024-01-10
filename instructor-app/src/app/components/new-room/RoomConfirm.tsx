import { FaArrowLeft } from "react-icons/fa";
import SeatComponent from "../SeatComponent";

export default function RoomConfirm({ setStep, data }: any) {
    const seatGenerator = () => {
        let seatArray = [];
        for (let index = 1; index <= data.numSeats; index++) {
            seatArray.push(<SeatComponent seatInfo={"none"} />);
        }
        return seatArray;
    };

    return (
        <>
            <div className="card w-full bg-base-100 shadow-xl mt-16">
                <form className="card-body">
                    <div className="flex flex-col md:flex-row justify-between items-baseline pb-4">
                        <h2 className="card-title font-bold text-3xl mb-4 self-center">
                            <button onClick={() => setStep(1)}>
                                <FaArrowLeft />
                            </button>
                            Confirm Room
                        </h2>
                    </div>
                    <div className="md:px-16 flex flex-col gap-4 ">
                        <ul className="steps pb-8">
                            <li className="step step-secondary">Details</li>
                            <li className="step step-secondary">Layout</li>
                            <li className="step step-secondary">Confirm</li>
                        </ul>

                        <h2 className="card-title font-semibold text-xl">Room Preview</h2>
                        <div className="card bg-base-200">
                            <div className="card-body">
                                {data && (
                                    <div
                                        className={`grid grid-cols-${data.dimensions.columns} grid-rows-${data.dimensions.rows} gap-4`}
                                    >
                                        {seatGenerator()}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex justify-between w-full mt-4 ">
                            <button
                                className="btn btn-secondary w-28"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setStep(1);
                                }}
                            >
                                Previous
                            </button>
                            <button className="btn w-30">Create Room</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}
