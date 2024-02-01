import * as admin from "firebase-admin";

export const createClasslist = async (
  courseCode: string,
  classList: Array<string>
) => {
  const query = admin.database().ref(`ClassLists/${courseCode}`);
  try {
    const snapshot = await query.once("value");
    if (!snapshot.exists()) {
      await query.set(classList);
    }
  } catch (error) {
    throw Error("Could not create class list.");
  }
};
