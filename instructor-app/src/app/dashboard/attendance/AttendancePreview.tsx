import React from "react";
import Link from "next/link";

function AttendancePreview({ course, courseName }: any) {
    if (course === "") {
        return (
            <div>
                <p className="text-center">Select a course to view attendance.</p>
            </div>
        );
    }

    return (
        <>
            <h2 className="card-title font-bold text-2xl mb-4">{course} - {courseName}</h2>
            <div className="flex flex-col md:flex-row gap-6">
                <Link className="card min-w-md w-full bg-primary text-primary-content hover:scale-105 hover:ease-in-out hover:duration-200" href={`attendance/logs/${course}`}>
                    <div className="card-body">
                        <h2 className="card-title text-2xl">Attendance Logs</h2>
                        <p>Review previous attendance logs for {course}.</p>
                    </div>
                </Link>

                <Link className="card min-w-md w-full bg-secondary text-primary-content hover:scale-105 hover:ease-in-out hover:duration-200" href={`attendance/snapshots/${course}`}>
                    <div className="card-body">
                        <h2 className="card-title text-2xl">Class Snapshots</h2>
                        <p>View classroom snapshots logs for {course}.</p>
                    </div>
                </Link>
            </div>
        </>
    );
}

export default AttendancePreview;
