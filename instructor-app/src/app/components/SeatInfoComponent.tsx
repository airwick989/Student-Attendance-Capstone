import Image from "next/image";
import { ReactNode } from "react";

type Seat = {
  fullName: string;
  prefName: string;
  pronouns: string;
  studentNumber: string;
  profilePicture: string;
};
type SeatInfo = "none" | Seat;

interface SeatInfoComponentProps {
  seatInfo: SeatInfo;
  index: number;
  children: ReactNode;
}

export default function SeatInfoComponent({
  seatInfo,
  index,
  children,
}: SeatInfoComponentProps) {
  return (
    <>
      <div className="relative inline-block">
        <div className="group">{children}</div>
        <div
          className={`absolute z-10 hidden group-hover:block p-2 mb-36 ${
            seatInfo != "none" ? `-top-56` : "-top-48"
          }  left-6 xl:left-16 card w-full md:w-64 lg:w-72 bg-base-200`}
        >
          <div className="card-body">
            <div className="flex flex-row gap-4 items-center">
              <div>
                <div className="avatar">
                  <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 bg-gray-700">
                    {seatInfo != "none" ? (
                      <Image
                        src={seatInfo.profilePicture||"/default.svg"}
                        alt="Profile Picture"
                        width={24}
                        height={24}
                        loading="lazy"
                      />
                    ) : (
                      <Image
                        src={"/default.svg"}
                        alt="Profile Picture"
                        width={24}
                        height={24}
                        loading="lazy"
                      />
                    )}
                  </div>
                </div>
              </div>
              <div>
                <h2 className="card-title">
                  {seatInfo == "none" ? "Empty Seat" : seatInfo.prefName}
                </h2>
                {seatInfo != "none" && (
                  <p className="text-sm pb-2">({seatInfo.fullName})</p>
                )}
                {seatInfo != "none" && (
                  <p className="italic text-xs">{seatInfo.pronouns}</p>
                )}
              </div>
            </div>

            <div className="overflow-hidden">
              <div className="divider my-1 text-sm font-thin"></div>

              {seatInfo != "none" && (
                <p>Student ID: {seatInfo.studentNumber}</p>
              )}
              <p>Seat Number: {index}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
