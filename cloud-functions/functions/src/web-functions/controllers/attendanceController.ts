import * as admin from "firebase-admin";
import {courseDetails} from "./courseController";
import {roomDetails} from "./roomController";

export const getAllSnapshots = async (courseCode: string) => {
  const snapshotCollection = admin
    .firestore()
    .collection("course-snapshots")
    .doc(courseCode)
    .collection("snapshots");

  const snapshot = await snapshotCollection.get();

  if (snapshot.empty) {
    throw Error("No snapshots found for this course.");
  }
  const snapshotList = snapshot.docs.map((doc) => {
    return {id: doc.id, name: doc.data().name, date: doc.data().timeStamp};
  });
  return snapshotList;
};

export const getSnapshot = async (courseCode: string, snapshotID: string) => {
  const snapshotCollection = admin
    .firestore()
    .collection("course-snapshots")
    .doc(courseCode)
    .collection("snapshots")
    .doc(snapshotID);

  const snapshot = await snapshotCollection.get();

  if (!snapshot.exists) {
    throw Error("Snapshot not found.");
  }

  try {
    const {courseRoom} = await courseDetails(courseCode);
    const {dimensions} = await roomDetails(courseRoom);

    const snapshotData = snapshot.data();
    const dataWithDimensions = {...snapshotData, dimensions, courseRoom};

    return dataWithDimensions;
  } catch (error) {
    throw Error(
      "Unexpected error. The room for this course may no longer exist."
    );
  }
};

export const getAllAttendanceLogs = async (courseCode: string) => {
  const attendanceCollection = admin
    .firestore()
    .collection("attendance-logs")
    .doc(courseCode)
    .collection("sorted-logs");

  const attendance = await attendanceCollection.get();

  if (attendance.empty) {
    throw Error("No attendance logs found for this course.");
  }
  const attendanceList = attendance.docs.map((doc) => {
    return {
      id: doc.id,
      startTime: doc.data().startTime,
      endTime: doc.data().endTime,
    };
  });
  return attendanceList;
};

export const getAttendanceLog = async (
  courseCode: string,
  timeStamp: string
) => {
  const attendanceLog = admin
    .firestore()
    .collection("attendance-logs")
    .doc(courseCode)
    .collection("sorted-logs")
    .doc(timeStamp);

  const log = await attendanceLog.get();

  if (!log.exists) {
    throw Error("Attendance log not found.");
  }
  return log.data();
};

export const downloadLog = async (
  attendanceLog: FirebaseFirestore.DocumentData | undefined
) => {
  type Log = {
    timeStamp: number;
    studentNumber: string;
  };
  if (attendanceLog === undefined) {
    throw Error("Attendance log not found.");
  }

  const csvData = [];
  let isFirstRow = true;

  csvData.push([
    "Student Number",
    "Time Stamp",
    "Total Students",
    "Attendance",
    "Start Time",
    "End Time",
  ]);

  const logDate = attendanceLog.startTime
    .toDate()
    .toLocaleDateString("en-US")
    .replace(/\//g, "_");

  if (attendanceLog.logs.length === 0) {
    const startTimeString = attendanceLog.startTime
      .toDate()
      .toLocaleTimeString("en-US");
    const endTimeString = attendanceLog.endTime
      .toDate()
      .toLocaleTimeString("en-US");
    const row = [
      "",
      "",
      attendanceLog.totalStudents,
      attendanceLog.attendance,
      startTimeString,
      endTimeString,
    ];
    csvData.push(row);
  } else {
    const sortedLogs = attendanceLog.logs.sort((a: Log, b: Log) => {
      return b.timeStamp - a.timeStamp;
    });

    sortedLogs.forEach((log: { studentNumber: string; timeStamp: number }) => {
      const startTimeString = isFirstRow ?
        attendanceLog.startTime.toDate().toLocaleTimeString("en-US") :
        "";
      const endTimeString = isFirstRow ?
        attendanceLog.endTime.toDate().toLocaleTimeString("en-US") :
        "";
      const row = [
        log.studentNumber || "",
        new Date(log.timeStamp).toLocaleTimeString("en-US") || "",
        isFirstRow ? attendanceLog.totalStudents || "" : "",
        isFirstRow ? attendanceLog.attendance || "" : "",
        startTimeString,
        endTimeString,
      ];
      csvData.push(row);
      isFirstRow = false;
    });
  }
  return {data: csvData, date: logDate};
};

export const createSnapshot = async (
  courseCode: string,
  room: string,
  snapshotName?: string
) => {
  if (!courseCode) {
    throw Error("Missing parameters");
  }
  const roomMapRef = admin.database().ref(`Rooms/${room}/map`);
  const roomMapSnapshot = await roomMapRef.once("value");
  const roomMap = roomMapSnapshot.val();

  const timeStamp = new Date();
  const unixStamp = timeStamp.getTime();

  const roomMapArray = Object.entries(roomMap);
  const updatedRoomMap = Object.fromEntries(roomMapArray);

  const snapshotRef = admin
    .firestore()
    .collection("course-snapshots")
    .doc(`${courseCode}`);

  const newSnapshotRef = snapshotRef
    .collection("snapshots")
    .doc(`${unixStamp}`);

  try {
    await newSnapshotRef.set({
      roomMap: updatedRoomMap,
      timeStamp: timeStamp,
      name: snapshotName || "Unnamed Snapshot",
    });
  } catch (error) {
    throw Error(error as string);
  }
};

export const removeAttendanceLogs = async (courseCode: string) => {
  const attendanceRef = admin
    .firestore()
    .collection("attendance-logs")
    .doc(courseCode);

  const snapshotRef = admin
    .firestore()
    .collection("course-snapshots")
    .doc(courseCode);

  try {
    await admin.firestore().recursiveDelete(attendanceRef);
    await admin.firestore().recursiveDelete(snapshotRef);
  } catch (error) {
    throw Error("Could not remove attendance logs.");
  }
};

export const removeSingleAttendanceLog = async (
  courseCode: string,
  timeStamp: string
) => {
  const attendanceLog = admin
    .firestore()
    .collection("attendance-logs")
    .doc(courseCode)
    .collection("sorted-logs")
    .doc(timeStamp);

  try {
    await attendanceLog.delete();
  } catch (error) {
    throw Error("Could not remove attendance log.");
  }
};

export const removeSingleSnapshot = async (
  courseCode: string,
  timeStamp: string
) => {
  const snapshot = admin
    .firestore()
    .collection("course-snapshots")
    .doc(courseCode)
    .collection("snapshots")
    .doc(timeStamp);

  try {
    await snapshot.delete();
  } catch (error) {
    throw Error("Could not remove snapshot.");
  }
};
