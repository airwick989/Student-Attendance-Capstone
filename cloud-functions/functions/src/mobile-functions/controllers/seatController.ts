import * as admin from "firebase-admin";

type student = {
  email: string;
  section: string;
  sis: string;
  studentId: string;
  studentName: string;
};

export const setSeat = async (
  seatNumber: number,
  roomName: string,
  courseCode: string,
  studentNumber: string,
  pronouns?: string,
  preferredName?: string
) => {
  const seatQuery = admin.database().ref(`Rooms/${roomName}/map/${seatNumber}`);
  const verifyStudent = await verifyStudentClassList(studentNumber, courseCode);
  const activeClass = await verifyActiveClass(roomName, courseCode);

  if (!verifyStudent) {
    throw Error("Student not found in class list.");
  }
  if (!activeClass) {
    throw Error("Class is not active in this room.");
  }
  const redundantSeat = await checkRedundantSeat(studentNumber);

  if (redundantSeat !== null) {
    await emptySeat(redundantSeat.roomName, redundantSeat.seat);
  }

  const {studentName} = verifyStudent;

  const profilePicture = await getProfilePicture(studentNumber);
  try {
    await seatQuery.update({
      fullName: studentName,
      prefName: preferredName || studentName,
      pronouns: pronouns || "none",
      studentNumber: studentNumber,
      courseCode: courseCode,
      profilePicture: profilePicture || "",
    });
    return `Seat set for ${roomName}`;
  } catch (e: unknown) {
    throw Error(`Could not set seat for ${roomName}`);
  }
};

export const emptySeat = async (roomName: string, seatNum: number) => {
  const seatQuery = admin.database().ref(`Rooms/${roomName}/map/`);

  const snapshot = await seatQuery.once("value");

  if (!snapshot.exists()) {
    throw Error("Invalid seat");
  }

  const seatData = snapshot.val();
  const maxSeat = Math.max(...Object.keys(seatData).map(Number));

  if (seatNum > maxSeat || seatNum <= 0) {
    throw Error("Invalid seat");
  }

  try {
    const updatedSeat: { [key: number]: string } = {};
    updatedSeat[seatNum] = "none";
    await seatQuery.update(updatedSeat);

    return "Student left room";
  } catch (e) {
    throw Error("Could not set seat");
  }
};

const verifyStudentClassList = async (
  studentNumber: string,
  courseCode: string
) => {
  const classListQuery = admin.database().ref(`ClassLists/${courseCode}`);

  const snapshot = await classListQuery.once("value");
  const classList: {
    [key: number]: student;
  } = snapshot.val();

  if (classList) {
    const exists = Object.values(classList).find(
      (student: student) => student.studentId === studentNumber
    );
    return exists || null;
  }
  return null;
};

const checkRedundantSeat = async (studentNumber: string) => {
  const roomQuery = admin.database().ref("Rooms");

  const snapshot = await roomQuery.once("value");
  const rooms = snapshot.val();

  if (rooms) {
    for (const roomName in rooms) {
      if (Object.prototype.hasOwnProperty.call(rooms, roomName)) {
        const room = rooms[roomName];
        const map = room.map;

        if (map) {
          for (const seat in map) {
            if (
              Object.prototype.hasOwnProperty.call(map, seat) &&
              map[seat].studentNumber === studentNumber
            ) {
              return {roomName, seat: parseInt(seat)};
            }
          }
        }
      }
    }
  }
  return null;
};

const verifyActiveClass = async (roomName: string, courseCode: string) => {
  const roomQuery = admin.database().ref(`Rooms/${roomName}/activeClass`);

  const snapshot = await roomQuery.once("value");
  const activeClass = snapshot.val();

  return activeClass.courseCode === courseCode;
};

const getProfilePicture = async (studentNumber: string) => {
  const userQuery = admin
    .firestore()
    .collection("users")
    .where("studentNumber", "==", studentNumber);

  const snapshot = await userQuery.get();
  if (!snapshot.empty) {
    const userDoc = snapshot.docs[0].data();
    if (userDoc.photo) {
      return userDoc.photo;
    }
  }

  return "";
};
