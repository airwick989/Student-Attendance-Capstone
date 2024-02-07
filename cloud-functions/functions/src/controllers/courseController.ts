import * as admin from "firebase-admin";

export const courseNames = async () => {
  const query = admin.database().ref("Courses");
  const result = await query.once("value");
  return result;
};

export const courseDetails =async (courseCode:string) => {
  const queryName = admin.database().ref(`Courses/${courseCode}/courseName`)
  const queryRoom = admin.database().ref(`Courses/${courseCode}/Room`)
  const queryStudents = admin.database().ref(`ClassLists/${courseCode}`)
  
  try {
    const nameSnapshot = await queryName.once('value');
    const courseName = nameSnapshot.val();

    const roomSnapshot = await queryRoom.once('value');
    const courseRoom = roomSnapshot.val();

    const studentsSnapshot = await queryStudents.once('value');
    const classList = studentsSnapshot.val();

    return {
      'courseName': courseName,
      'courseRoom': courseRoom,
      'classList': classList
    };
  } catch (error) {
    console.error('Error fetching course details:', error);
    throw error; // Re-throw the error if needed
  }
};

export const createCourse = async (
  courseCode: string,
  courseName: string,
  room?: [string]
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
    if (room) {
      await course.child("Room").set(room);
    }
  } catch (error) {
    throw Error("Could not create course.");
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
