import { useState } from "react";

type meetingTime = {
  meetingDate: string;
  timeRange: string[];
};

type courseList = {
  [key: string]: {
    meetingTimes: {
      [key: string]: meetingTime;
    };
    Room: string;
    courseName: string;
  };
};

export default function useTimeValidation() {
  const [validTime, setValidTime] = useState(false);
  
  const timeValidator = (meetingTimes: meetingTime[]) => {
    for (const meetingTime of meetingTimes) {
      const { meetingDate, timeRange } = meetingTime;
      if (!meetingDate || !timeRange[0] || !timeRange[1]) {
        return setValidTime(false);
      }
      const [startTime, endTime] = timeRange;
      if (startTime >= endTime) {
        return setValidTime(false);
      }
    }
    if (meetingTimes.length > 1) {
      if (meetingTimes[0].meetingDate === meetingTimes[1].meetingDate) {
        if (
          meetingTimes[0].timeRange[0] === meetingTimes[1].timeRange[0] &&
          meetingTimes[0].timeRange[1] === meetingTimes[1].timeRange[1]
        ) {
          return setValidTime(false);
        }
      }
    }
    for (let i = 0; i < meetingTimes.length; i++) {
      const { meetingDate: date1, timeRange: range1 } = meetingTimes[i];
      for (let j = i + 1; j < meetingTimes.length; j++) {
        const { meetingDate: date2, timeRange: range2 } = meetingTimes[j];
        if (date1 === date2) {
          const [start1, end1] = range1;
          const [start2, end2] = range2;
          if (!(end1 <= start2 || start1 >= end2)) {
            return setValidTime(false);
          }
        }
      }
    }

    return setValidTime(true);
  };

  const timeConflict = (
    meetingTimes: meetingTime[],
    courseList: courseList,
    courseCode: string,
    roomName: string
  ) => {
    const filteredCourseList: courseList = {};
    const conflictCourses: string[] = [];

    if (courseCode in courseList) {
      delete courseList[courseCode];
    }

    for (const courseId in courseList) {
      const course = courseList[courseId];

      if (course.Room[0] === roomName) {
        filteredCourseList[courseId] = course;
      }
    }

    for (const courseId in filteredCourseList) {
      const course = filteredCourseList[courseId];
      const courseMeetingTimes = Object.values(course.meetingTimes);

      for (const courseMeetingTime in courseMeetingTimes) {
        for (const meetingTime of meetingTimes) {
          if (
            courseMeetingTimes[courseMeetingTime].meetingDate ===
            meetingTime.meetingDate
          ) {
            const { 0: startMeetingTimeCompared, 1: endMeetingTimeCompared } =
              courseMeetingTimes[courseMeetingTime].timeRange;
            const [start2, end2] = meetingTime.timeRange;

            if (
              !(
                endMeetingTimeCompared <= start2 ||
                startMeetingTimeCompared >= end2
              )
            ) {
              conflictCourses.push(
                `${course.courseName} at ${course.Room[0]} on ${courseMeetingTimes[courseMeetingTime].meetingDate} from ${timeConversion(startMeetingTimeCompared)} to ${timeConversion(endMeetingTimeCompared)}`
              );
            }

          }
        }
      }
    }
    return conflictCourses;

  };

  const timeConversion = (time: string) => {
    const timeArray = time.split(":");
    const hours = parseInt(timeArray[0]);
    const minutes = parseInt(timeArray[1]);
    const timeString = hours >= 12 ? "PM" : "AM";
    const hoursString = hours % 12 === 0 ? "12" : (hours % 12).toString();
    const formatMinutes = minutes < 10 ? "0" + minutes : minutes;
    return `${hoursString}:${formatMinutes} ${timeString}`;
};

  return { timeValidator, timeConflict, timeConversion, validTime };
}