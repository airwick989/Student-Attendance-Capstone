import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

interface student {
  fullName: string;
  prefName?: string;
  studentNumber?: string;
  pronouns?: string;
  courseCode: string;
}

export const attendanceLogger = functions.database
  .ref("/Rooms/{roomName}/map")
  .onUpdate((change, context) => {
    const newValue = change.after.val();
    const previousValue = change.before.val();
    const roomId = context.params.roomName;

    console.log("Room ID: ", roomId);

    const addedValue = newValue.filter(
      (obj: [] | student) => !previousValue.includes(obj)
    );

    console.log("Added Value(s): ", addedValue);

    if (addedValue.length !== 0) {
      const batch = admin.firestore().batch();

      addedValue.forEach((student: student) => {
        const courseCode = student.courseCode;
        const attendanceLogs = admin
          .firestore()
          .collection("attendance-logs")
          .doc(courseCode);
        const newLogRef = attendanceLogs.collection("logs").doc();
        batch.set(newLogRef, {
          timeStamp: Date.now(),
          studentNumber: student.studentNumber,
        });
      });

      return batch.commit().then(() => {
        console.log("Attendance logged.");
      });
    }

    return null;
  });
