import * as admin from "firebase-admin";
import {resetActiveClass} from "./roomController";
import {removeAttendanceLogs} from "./attendanceController";

export const courseNames = async () => {
  const query = admin.database().ref("Courses");
  const result = await query.once("value");
  if (!result.exists()) {
    return {};
  }
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
      await removeAttendanceLogs(courseCode);
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
      const room = snapshot.child("Room").val();
      if (room) {
        await resetActiveClass(room, coursecode);
      }

      await query.remove();
      await removeAttendanceLogs(coursecode);
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

export const updateRoomParameter = async (
  oldRoomCode: string,
  newRoomCode: string
) => {
  if (!oldRoomCode || !newRoomCode) {
    throw Error("Missing parameters");
  }

  const courseRef = admin.database().ref("Courses");
  const courseSnapshot = await courseRef.once("value");

  try {
    const updates: { [key: string]: { Room: string[] } } = {};

    courseSnapshot.forEach((courseSnapshot) => {
      const courseId = courseSnapshot.key;
      if (courseId !== null) {
        const courseData = courseSnapshot.val();

        if (courseData.Room && courseData.Room.includes(oldRoomCode)) {
          const updatedRoom = courseData.Room.map((room: string) =>
            room === oldRoomCode ? newRoomCode : room
          );
          updates[courseId] = {...courseData, Room: updatedRoom};
        }
      }
    });

    await courseRef.update(updates);
  } catch (error) {
    throw Error("Could not update course");
  }
};
