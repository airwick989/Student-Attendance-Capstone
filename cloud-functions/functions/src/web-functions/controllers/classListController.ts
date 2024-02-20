import * as admin from "firebase-admin";
import {registerClass, unregisterClass} from "./studentAccountController";

export const createClasslist = async (
  courseCode: string,
  classList: Array<string>
) => {
  const query = admin.database().ref(`ClassLists/${courseCode}`);
  try {
    const snapshot = await query.once("value");
    if (!snapshot.exists()) {
      await query.set(classList);
      await registerClass(courseCode, classList);
    }
  } catch (error) {
    throw Error("Could not create class list.");
  }
};

export const editClasslist = async (
  oldCourseCode: string,
  courseCode: string,
  classList: Array<string>,
  isFileChanged: boolean
) => {
  const classListRef = admin.database().ref(`ClassLists/${oldCourseCode}`);
  const classListSnapshot = (await classListRef.once("value")).val();

  if (oldCourseCode === courseCode) {
    try {
      if (isFileChanged) {
        await classListRef.set(classList);
        await unregisterClass(oldCourseCode);
        await registerClass(oldCourseCode, classList);
      }
    } catch (error) {
      throw Error("Could not update class list.");
    }
  } else {
    try {
      if (isFileChanged) {
        createClasslist(courseCode, classList);
        await registerClass(courseCode, classList);
        await unregisterClass(oldCourseCode);
      } else {
        createClasslist(courseCode, classListSnapshot);
      }

      // Remove old class list node
      await classListRef.remove();
    } catch (error) {
      throw Error("Could not update class list.");
    }
  }
};

export const deleteClasslist = async (courseCode: string) => {
  const query = admin.database().ref(`ClassLists/${courseCode}`);
  try {
    const snapshot = await query.once("value");
    if (snapshot.exists()) {
      await query.remove();
      await unregisterClass(courseCode);
    }
  } catch (error) {
    throw Error("Could not delete class list.");
  }
};
