"use client";

import { useEffect, useState } from "react";
import AttendancePreview from "./AttendancePreview";

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
  const [activeCourse, setActiveCourse] = useState<string>(
    localStorage.getItem("activeCourse") || ""
  );
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          "http://localhost:5001/student-attendance-capst-7115c/us-central1/api/professor/getAllClasses",
          { next: { revalidate: 30 } }
        );
        const data = await res.json();
        setCourses(data);
        // setLoading(false);
      } catch (error) {
        console.error("Error:", error);
        // setLoading(false);
      }
    })();
  }, []);
  return (
    <>
      <div className="min-h-screen bg-base-200">
        <div className="flex flex-col items-center mx-16 lg:mx-64 min-w-md">
          <div className="card w-full bg-base-100 shadow-xl mt-16 p-6 min-h-screen mb-6">
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
                <AttendancePreview
                  course={activeCourse}
                  courseName={courses[activeCourse].courseName}
                />
              ) : (<p className=" text-center text-lg mt-2">Select a course to view attendance.</p>)}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
