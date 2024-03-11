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
