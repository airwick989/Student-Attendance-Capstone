import Link from "next/link";
import React from "react";
import { FaArrowLeft } from "react-icons/fa";

export default function Page({ params }: { params: { courseName: string } }) {
  return (
    <>
      <div className="min-h-screen bg-base-200">
        <div className="flex flex-col items-center xl:px-96 lg:px-64 px-16">
          <div className="card w-full bg-base-100 shadow-xl mt-16 py-6">
            <div className="card-body">
              <div className="flex flex-col md:flex-row justify-between items-baseline pb-4">
                <h2 className="card-title font-bold text-3xl mb-4 self-center">
                  <Link href={"/dashboard/attendance"}>
                    <FaArrowLeft />
                  </Link>
                  Attendance Logs for {params.courseName}
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
