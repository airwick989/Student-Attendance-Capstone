import db from "../firebase.mjs";
import { get, ref, update } from "firebase/database";
import { getStudentInfo } from "./studentController.mjs";

const getSeat = async (roomNum, seatNum) => {
  if (!roomNum || !seatNum) {
    throw Error("Missing parameters");
  }

  const seatQuery = ref(db, `Rooms/${roomNum}/map/${seatNum}`);
  const seat = await get(seatQuery);

  if (!seat.exists()) {
    throw Error("Could not find seat.");
  }
  return seat.val();
};

const setSeat = async (roomNum, seatNum, studentNum) => {
  const seatQuery = ref(db, `Rooms/${roomNum}/map/${seatNum}`);

  if (!(await get(seatQuery)).exists()) {
    throw Error("Invalid seat position.");
  }

  try {
    const student = await getStudentInfo(studentNum);
    await update(seatQuery, student);
    return `${student.prefName} joined Room ${roomNum}`;
  } catch (e) {
    throw Error(e);
  }
};

const emptySeat = async (roomNum, seatNum) => {
  const roomQuery = ref(db, `Rooms/${roomNum}/map/`);

  try {
    const previous = await getSeat(roomNum, seatNum);

    const updatedSeat = {};
    updatedSeat[seatNum] = "none";
    await update(roomQuery, updatedSeat);

    return `${previous.prefName} left room ${roomNum}`;
  } catch (e) {
    throw Error(e);
  }
};

export { getSeat, setSeat, emptySeat };

/*(async () => {
  emptySeat("UA1350", 1);
})();
*/
