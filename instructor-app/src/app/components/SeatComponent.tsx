import { FaSquare } from "react-icons/fa";

interface Seat {
    fullName: string;
    prefName: string;
    pronouns: string;
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
        <>
            <div
                className="tooltip before:whitespace-pre before:content-[attr(data-tip)] col-span-1 justify-center"
                data-tip={
                    seatInfo == "none"
                        ? `Seat Number: ${index} \nEmpty Seat`
                        : `Seat Number: ${index} \nStudent Name: ${seatInfo.fullName} \nPreferred Name: ${seatInfo.prefName} \nPronouns: ${seatInfo.pronouns}`
                }
            >
                <FaSquare
                    size={96}
                    color={seatInfo == "none" ? `gray` : `#8781AD`}
                    className="md:w-10 lg:w-12 xl:w-16 rounded self-center w-8"
                ></FaSquare>
            </div>
        </>
    );
}
