import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

interface AttendanceLog {
  timeStamp: number;
  studentNumber: string;
}

export const processAttendance = functions.pubsub
  .schedule("*/5  * * * *")
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  .onRun(async (context) => {
    const currentDate = new Date();
    const currentDay = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ][currentDate.getDay()];

    console.log("Current Day: ", currentDay);

    try {
      const courseSnapshot = await admin
        .database()
        .ref("/Courses")
        .once("value");

      courseSnapshot.forEach((course) => {
        const courseCode = course.key;
        const meetingTimes = course.child("meetingTimes").val();

        for (const key in meetingTimes) {
          if (Object.prototype.hasOwnProperty.call(meetingTimes, key)) {
            const meetingTime = meetingTimes[key];
            const meetingDay = meetingTime.meetingDate;
            const timeRange = meetingTime.timeRange;
            if (currentDay === meetingDay) {
              console.log("Course: ", courseCode);
              console.log("Current Day matches meetingDay: ", meetingDay);
              console.log("Time Range: ", timeRange);

              const year = currentDate.getFullYear();
              const month = currentDate.getMonth();
              const day = currentDate.getDate();

              const startTime = new Date(
                year,
                month,
                day,
                parseInt(timeRange[0].split(":")[0]),
                parseInt(timeRange[0].split(":")[1])
              );

              const endTime = new Date(
                year,
                month,
                day,
                parseInt(timeRange[1].split(":")[0]),
                parseInt(timeRange[1].split(":")[1])
              );

              const startUnix = startTime.getTime();
              const endUnix = endTime.getTime();

              console.log("Start Time: ", startTime);
              console.log("End Time: ", endTime);
              console.log("Start Unix: ", startUnix);
              console.log("End Unix: ", endUnix);

              if (courseCode) {
                retrieveAttendanceLogs(courseCode)
                  .then((attendanceLogs) => {
                    // console.log("Attendance Logs: ", attendanceLogs);
                    const filteredLogs = filterAttendanceLogs(
                      attendanceLogs,
                      startUnix,
                      endUnix
                    );
                    console.log("Filtered Logs: ", filteredLogs);
                    return filteredLogs;
                  })
                  .then((filteredLogs) => {
                    saveLogs(courseCode, filteredLogs, startTime, endTime);
                  })
                  .catch((error) => {
                    console.error("Error retrieving attendance logs: ", error);
                  });
              }
            }
          }
        }
      });
    } catch (error) {
      console.error("Error processing attendance: ", error);
      throw error;
    }
  });

const retrieveAttendanceLogs = async (
  courseCode: string
): Promise<AttendanceLog[]> => {
  const logsRef = admin
    .firestore()
    .collection("attendance-logs")
    .doc(courseCode)
    .collection("logs");

  const logSnapshot = await logsRef.get();

  const attendanceLogs: AttendanceLog[] = logSnapshot.docs.map(
    (doc) => doc.data() as AttendanceLog
  );
  return attendanceLogs;
};

const filterAttendanceLogs = (
  logs: AttendanceLog[],
  startTime: number,
  endTime: number
) => {
  const logsInRange = logs.filter((log: { timeStamp: number }) => {
    return log.timeStamp >= startTime && log.timeStamp <= endTime;
  });

  return logsInRange;

  /* const uniqueLogs: Map<string, AttendanceLog> = new Map();
  logsInRange.forEach((log) => {
    if (
      !uniqueLogs.has(log.studentNumber) ||
      log.timeStamp > (uniqueLogs.get(log.studentNumber)?.timeStamp ?? 0)
    ) {
      uniqueLogs.set(log.studentNumber, log);
    }
  });

  const filteredLogs: AttendanceLog[] = Array.from(uniqueLogs.values());

  return filteredLogs; */
};

const saveLogs = async (
  courseCode: string,
  logs: AttendanceLog[],
  startTime: Date,
  endTime: Date
) => {
  const attendanceLogs = admin
    .firestore()
    .collection("attendance-logs")
    .doc(courseCode);

  const newLogRef = attendanceLogs
    .collection("sorted-logs")
    .doc(`${startTime}-${endTime}`);

  const uniqueStudents = new Set<string>();

  logs.forEach((log) => {
    uniqueStudents.add(log.studentNumber);
  });

  const uniqueStudentCount = uniqueStudents.size;

  newLogRef.set({
    numofStudents: uniqueStudentCount,
    logs: logs,
  });
};
