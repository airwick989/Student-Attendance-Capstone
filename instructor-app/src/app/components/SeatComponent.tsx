import { FaSquare } from "react-icons/fa";

interface Seat {
    fullName: string;
    prefName: string;
    pronouns: string;
}

type SeatInfo = "none" | Seat;

export default function SeatComponent({ seatInfo }: { seatInfo: SeatInfo }) {
    return (
        <>
            <div
                className="md:tooltip before:whitespace-pre before:content-[attr(data-tip)]"
                data-tip={
                    seatInfo == "none"
                        ? `Empty Seat`
                        : `Student Name: ${seatInfo.fullName} \nPreferred Name: ${seatInfo.prefName} \nPronouns: ${seatInfo.pronouns}`
                }
            >
                <div className="avatar">
                    <div className="w-24 rounded text-center">
                        <FaSquare
                            size={96}
                            color={seatInfo == "none" ? `gray` : `#8781AD`}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
