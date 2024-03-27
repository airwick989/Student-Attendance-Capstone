import AttendanceCharts from "@/app/components/attendance/AttendanceCharts";
import { useAttendanceData } from "@/app/components/attendance/AttendanceDataProvider";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function AttendancePreview({ course, courseName }: any) {
  const { attendanceData, updateAttendanceData } = useAttendanceData();
  const [data, setData] = useState<
    { name: string; students: number; rate: number }[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      if (course === "") {
        setData([{ name: "No Data", students: 0, rate: 0 }]);
        return;
      }

      if (attendanceData[course]) {
        setData(attendanceData[course]);
      } else {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/professor/getAttendanceRates/${course}`
        );
        const newData = await res.json();
        setData(newData);
        updateAttendanceData(course, newData);
      }
    };

    fetchData();
  }, [course, attendanceData, updateAttendanceData]);

  if (course === "") {
    return (
      <div>
        <p className="text-center">Select a course to view attendance.</p>
      </div>
    );
  }

  return (
    <>
      <h2 className="card-title font-bold text-2xl mb-4">
        {course} - {courseName}
      </h2>
      <AttendanceCharts data={data} />
      <div className="flex flex-col md:flex-row gap-6 mt-4">
        <Link
          className="card min-w-md w-full bg-primary text-primary-content hover:scale-105 hover:ease-in-out hover:duration-200"
          href={`attendance/logs/${course}`}
        >
          <div className="card-body">
            <h2 className="card-title text-2xl">Attendance Logs</h2>
            <p>Review previous attendance logs for {course}.</p>
          </div>
        </Link>

        <Link
          className="card min-w-md w-full bg-secondary text-primary-content hover:scale-105 hover:ease-in-out hover:duration-200"
          href={`attendance/snapshots/${course}`}
        >
          <div className="card-body">
            <h2 className="card-title text-2xl">Class Snapshots</h2>
            <p>View classroom snapshots for {course}.</p>
          </div>
        </Link>
      </div>
    </>
  );
}
