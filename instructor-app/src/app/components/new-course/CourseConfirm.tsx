import { FaArrowLeft } from "react-icons/fa";
import { MouseEvent } from "react";

type ValuePiece = Date | string | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];
type MeetingTime = {
    meetingDate: string;
    timeRange: Value;
};
type MeetingTimes = MeetingTime[];

interface CourseConfirmProps {
    setStep: (step: number) => void;
    data: {
        courseCode: string;
        courseName: string;
        room: string[];
        meetingTimes: MeetingTimes;
    };
    createCourse: () => Promise<void>;
    file: File | null;
    editFlag?: boolean; // New prop with a default value of false
}

export default function CourseConfirm({
    setStep,
    data,
    createCourse,
    file,
    editFlag = false, // Default value for editFlag
}: CourseConfirmProps) {
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
                                <div className="py-1">
                                    <span className="underline">Meeting Time(s):</span>
                                    {data.meetingTimes.map((meetingTime, index) => {
                                        return (
                                            <p key={index} className="text-lg font-bold">
                                                {meetingTime.meetingDate} from{" "}
                                                {
                                                meetingTime.timeRange
                                                    ?.toLocaleString()
                                                    .replace(",", " to ")}
                                            </p>
                                        );
                                    })}
                                </div>
                                <div>
                                    Class List:{" "}
                                    {file
                                        ? `"${file.name}"`
                                        : editFlag
                                            ? "Class list unchanged."
                                            : "No file selected."}
                                </div>
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
                                {editFlag ? "Update Course" : "Create Course"}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}
