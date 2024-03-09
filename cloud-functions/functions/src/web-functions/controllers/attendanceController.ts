import * as admin from "firebase-admin";

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
