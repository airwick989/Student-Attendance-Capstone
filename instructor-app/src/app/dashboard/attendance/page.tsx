"use client";

import { useEffect, useState } from "react";
import AttendancePreview from "./AttendancePreview";
import { AttendanceDataProvider } from "@/app/components/attendance/AttendanceDataProvider";
import Loading from "./loading";

type MeetingTimes = {
  [key: string]: {
    meetingDate: string;
    timeRange: string[];
  };
};

interface Course {
  courseName: string;
  Room: string[];
  meetingTimes: MeetingTimes;
}

interface Courses {
  [classKey: string]: Course;
}

export default function Page() {
  const [courses, setCourses] = useState<Courses>({});
  const [loading, setLoading] = useState(true);
  const [activeCourse, setActiveCourse] = useState<string>(
    typeof window !== 'undefined' ? localStorage.getItem("activeCourse") || "" : ""
  );
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/professor/getAllClasses`,
          { next: { revalidate: 30 } }
        );
        const data = await res.json();
        setCourses(data);
        setLoading(false);
      } catch (error) {
        console.error("Error:", error);
      }
    })();
  }, []);
  return (
    <>
      {loading && <Loading />}
      <div className="min-h-screen bg-base-200">
        <div className="flex flex-col items-center mx-8 lg:mx-64 min-w-md">
          <div className="card w-full bg-base-100 shadow-xl my-32 p-6 min-h-screen mb-6">
            <div className="card-body">
              <div className="flex flex-col md:flex-row justify-between items-baseline overflow-auto">
                <h2 className="card-title font-bold text-3xl mb-4 self-center">
                  Attendance
                </h2>
                <select
                  className="select select-ghost w-full max-w-xs font-semibold text-md"
                  onChange={(e) => {
                    setActiveCourse(e.target.value);
                    localStorage.setItem("activeCourse", e.target.value);
                  }}
                >
                  <option value="" defaultValue={""}>
                    {Object.keys(courses).length > 0
                      ? "Select a course"
                      : "No courses available"}
                  </option>
                  {courses &&
                    Object.keys(courses).map((courseKey, index) => (
                      <option
                        key={index}
                        value={courseKey}
                      >{`${courseKey} - ${courses[courseKey].courseName}`}</option>
                    ))}
                </select>
              </div>
              <div className="divider"></div>
              {courses && courses[activeCourse] ? (
                <AttendanceDataProvider>
                  <AttendancePreview
                    course={activeCourse}
                    courseName={courses[activeCourse].courseName}
                  />
                </AttendanceDataProvider>
              ) : (<p className=" text-center text-lg mt-2">Select a course to view attendance.</p>)}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
