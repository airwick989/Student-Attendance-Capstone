import { FaArrowLeft } from "react-icons/fa";
import SeatComponent from "../SeatComponent";
import { MouseEvent } from "react";

interface RoomConfirmProps {
    setStep: (step: number) => void;
    data: {
        roomName: string;
        numSeats: number;
        dimensions: {
            rows: number;
            columns: number;
        };
    };
    createRoom: () => Promise<void>;
    editFlag?: boolean;
}

const RoomConfirm: React.FC<RoomConfirmProps> = ({
    setStep,
    data,
    createRoom,
    editFlag = false,
}: RoomConfirmProps) => {
    const seatGenerator = () => {
        let seatArray = [];
        for (let index = 1; index <= data.numSeats; index++) {
            seatArray.push(
                <SeatComponent
                    seatInfo={"none"}
                    key={index}
                    index={data.numSeats - index + 1}
                />
            );
        }
        return seatArray;
    };

    const submitForm = async (e: MouseEvent) => {
        e.preventDefault();
        await createRoom();
    };

    return (
        <>
            <div className="card w-full bg-base-100 shadow-xl my-32 py-6">
                <form className="card-body">
                    <div className="flex flex-col md:flex-row justify-between items-baseline mb-4">
                        <h2 className="card-title font-bold text-3xl mb-4 self-center">
                            <button onClick={() => setStep(1)}>
                                <FaArrowLeft />
                            </button>
                            Confirm Room
                        </h2>
                    </div>
                    <div className="md:px-16 flex flex-col gap-4 ">
                        <ul className="steps mb-8">
                            <li className="step step-primary">Details</li>
                            <li className="step step-primary">Layout</li>
                            <li className="step step-primary">Confirm</li>
                        </ul>

                        <h2 className="card-title font-semibold text-2xl">Preview</h2>
                        <div className="card bg-base-200 mb-4">
                            <div className="card-body">
                                {data && (
                                    <div
                                        className={`grid grid-cols-${data.dimensions.columns} grid-rows-${data.dimensions.rows} gap-4`}
                                    >
                                        {seatGenerator()}
                                    </div>
                                )}
                                <div className="divider"></div>
                                <p className="text-center font-semibold text-xl pb-6">
                                    Front of Class
                                </p>
                            </div>
                        </div>
                        <h2 className="card-title font-semibold text-2xl mt-4">Details</h2>

                        <div className="card bg-base-200">
                            <div className="card-body text-xl">
                                <div>Room Name: {data.roomName}</div>
                                <div>Number of Seats: {data.numSeats}</div>
                                <div>Rows: {data.dimensions.rows}</div>
                                <div>Columns: {data.dimensions.columns}</div>
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
                            <button
                                className="btn btn-primary w-30"
                                onClick={(e) => submitForm(e)}
                            >
                                {editFlag ? "Update Room" : "Create Room"}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

// Set default value for editFlag
RoomConfirm.defaultProps = {
    editFlag: false,
};

export default RoomConfirm;
