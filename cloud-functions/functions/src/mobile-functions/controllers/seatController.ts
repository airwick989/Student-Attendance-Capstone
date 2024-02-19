import * as admin from "firebase-admin";

export const setSeat = async (
  studentName: string,
  seatNumber: number,
  roomName: string,
  studentNumber?: string,
  pronouns?: string,
  preferredName?: string
) => {
  const seatQuery = admin.database().ref(`Rooms/${roomName}/map/${seatNumber}`);

  try {
    await seatQuery.update({
      fullName: studentName,
      prefName: preferredName || studentName,
      pronouns: pronouns || "none",
      studentNumber: studentNumber || "none",
    });
    return "Seat set";
  } catch (e: unknown) {
    throw new Error(e as string);
  }
};

export const emptySeat = async (roomName: string, seatNum: number) => {
  const seatQuery = admin.database().ref(`Rooms/${roomName}/map/`);

  const snapshot = await seatQuery.once("value");

  if (!snapshot.exists()) {
    return "Invalid seat";
  }

  try {
    const updatedSeat: { [key: number]: string } = {}; // Add index signature
    updatedSeat[seatNum] = "none";
    await seatQuery.update(updatedSeat);

    return "Student left room";
  } catch (e) {
    return "Could not set seat";
  }
};
