import { FaSquare } from "react-icons/fa";
import SeatInfoComponent from "./SeatInfoComponent";

interface Seat {
    fullName: string;
    prefName: string;
    pronouns: string;
    studentNumber: string;
    profilePicture: string;
}

type SeatInfo = "none" | Seat;

export default function SeatComponent({
    seatInfo,
    index,
}: {
    seatInfo: SeatInfo;
    index: number;
}) {
    return (
        <div className="relative inline-block group">
            <div
                className="tooltip before:whitespace-pre before:content-[attr(data-tip)] col-span-1 justify-center "
                data-tip={
                    seatInfo == "none"
                        ? `Seat Number: ${index} \nEmpty Seat`
                        : `Seat Number: ${index} \nPreferred Name: ${seatInfo.prefName} \nStudent Number: ${seatInfo.studentNumber} \nPronouns: ${seatInfo.pronouns}`
                }
            >

                <div className="block lg:hidden">
                    <FaSquare
                        size={96}
                        color={seatInfo == "none" ? `gray` : `#8781AD`}
                        className="md:w-10 lg:w-12 xl:w-16 rounded self-center w-8"
                    />
                </div>
            </div>
            <div className="hidden lg:block">
                    <SeatInfoComponent seatInfo={seatInfo} index={index}>
                        <FaSquare
                            size={96}
                            color={seatInfo == "none" ? `gray` : `#8781AD`}
                            className="md:w-10 lg:w-12 xl:w-16 rounded self-center w-8"
                        />
                    </SeatInfoComponent>
                </div>
        </div>
    );
}
