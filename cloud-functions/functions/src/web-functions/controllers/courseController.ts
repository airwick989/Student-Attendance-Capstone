import * as admin from "firebase-admin";

export const courseNames = async () => {
  const query = admin.database().ref("Courses");
  const result = await query.once("value");
  return result;
};

export const courseDetails = async (courseCode: string) => {
  const queryName = admin.database().ref(`Courses/${courseCode}/courseName`);
  const queryRoom = admin.database().ref(`Courses/${courseCode}/Room`);
  const queryStudents = admin.database().ref(`ClassLists/${courseCode}`);

  try {
    const nameSnapshot = await queryName.once("value");
    const courseName = nameSnapshot.val();

    const roomSnapshot = await queryRoom.once("value");
    const courseRoom = roomSnapshot.val();

    const studentsSnapshot = await queryStudents.once("value");
    const classList = studentsSnapshot.val();

    return {
      courseName: courseName,
      courseRoom: courseRoom,
      classList: classList,
    };
  } catch (error) {
    console.error("Error fetching course details:", error);
    throw error; // Re-throw the error if needed
  }
};

export const createCourse = async (
  courseCode: string,
  courseName: string,
  room: [string],
  meetingTimes: [{ meetingDate: string; timeRange: string[] }]
) => {
  if (!courseName || !courseCode) {
    throw Error("Missing parameters");
  }
  const course = admin.database().ref(`Courses/${courseCode}`);
  try {
    const snapshot = await course.once("value");
    if (!snapshot.exists()) {
      await course.set({courseName});
    }
    if (room && meetingTimes) {
      await course.child("Room").set(room);
      await course.child("meetingTimes").set(meetingTimes);
    }
  } catch (error) {
    throw Error("Could not create course.");
  }
};

export const editCourse = async (
  oldCourseCode: string,
  courseCode: string,
  courseName: string,
  room: [string],
  meetingTimes: [{ meetingDate: string; timeRange: string[] }]
) => {
  if (oldCourseCode === courseCode) {
    if (!courseName || !courseCode) {
      throw Error("Missing parameters");
    }
    const courseRef = admin.database().ref(`Courses/${courseCode}`);

    try {
      await courseRef.update({
        Room: room,
        courseName: courseName,
        meetingTimes: meetingTimes,
      });
    } catch (error) {
      throw Error("Could not create course.");
    }
  } else {
    try {
      createCourse(courseCode, courseName, room, meetingTimes);

      // Remove old course node
      const oldCourseRef = admin.database().ref(`Courses/${oldCourseCode}`);
      await oldCourseRef.remove();
    } catch (error) {
      throw Error("Could not update course");
    }
  }
};

export const deleteCourse = async (coursecode: string) => {
  if (!coursecode) {
    throw Error("Missing parameters.");
  }
  const query = admin.database().ref(`Courses/${coursecode}`);
  try {
    const snapshot = await query.once("value");
    if (snapshot.exists()) {
      await query.remove();
      return `${coursecode} deleted.`;
    }
    return "Course not found.";
  } catch (error) {
    throw Error("Could not delete course.");
  }
};

export const addRoomtoCourse = async (coursecode: string, room: string) => {
  if (room || !coursecode) {
    throw Error("Missing parameters");
  }
  const query = admin.database().ref(`Courses/${coursecode}/Room`);
  try {
    await query.push(room);
    return "Room successfully added to course";
  } catch (error) {
    throw Error("Could not add room to course.");
  }
};

export const createSnapshot = async (
  courseCode: string,
  room: string,
  snapshotName?: string
) => {
  if (!courseCode || !snapshotName) {
    throw Error("Missing parameters");
  }
  const roomMapRef = admin.database().ref(`Rooms/${room}/map`);
  const roomMapSnapshot = await roomMapRef.once("value");
  const roomMap = roomMapSnapshot.val();
  // Need to delete 0: undefined or shift indexes by 1
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
