import * as admin from "firebase-admin";

export const courseNames = async () => {
  const query = admin.database().ref("Courses");
  const result = await query.once("value");
  return result;
};
