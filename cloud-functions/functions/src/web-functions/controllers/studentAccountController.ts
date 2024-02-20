import * as admin from "firebase-admin";

export const registerClass = async (
  courseCode: string,
  classList: Array<unknown>
) => {
  const userCollection = admin.firestore().collection("users");

  for (const student of classList) {
    const {email} = student as {
      email: string;
    };
    const querySnapshot = await userCollection
      .where("email", "==", email)
      .get();

    if (!querySnapshot.empty) {
      const userDocument = querySnapshot.docs[0];

      if (userDocument.exists && userDocument.data().registeredClasses) {
        const registeredClasses = userDocument.data().registeredClasses;
        if (!registeredClasses.includes(courseCode)) {
          registeredClasses.push(courseCode);
          await userCollection
            .doc(userDocument.id)
            .update({registeredClasses});
        }
      }
    }
  }
};

export const unregisterClass = async (courseCode: string) => {
  const userCollection = admin.firestore().collection("users");
  const querySnapshot = await userCollection
    .where("registeredClasses", "array-contains", courseCode)
    .get();

  if (!querySnapshot.empty) {
    querySnapshot.forEach(async (userDocument) => {
      const registeredClasses = userDocument.data().registeredClasses;
      const updatedRegisteredClasses = registeredClasses.filter(
        (code: string) => code !== courseCode
      );

      await userCollection
        .doc(userDocument.id)
        .update({registeredClasses: updatedRegisteredClasses});
    });
  }
};
