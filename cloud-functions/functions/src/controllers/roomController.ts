import * as admin from "firebase-admin";

export const roomNames = async () => {
  const query = admin.database().ref("Rooms");
  const result = await query.once("value");
  const data = result.val();
  const roomNames = Object.keys(data || {});

  return roomNames;
};

export const createRoom = async (
  roomName: string,
  totalSeats: number,
  dimensions?: { rows: number; columns: number }
) => {
  if (!roomName || !totalSeats) {
    throw Error("Missing parameters.");
  }
  if (totalSeats == 0) {
    throw Error("Cannot have 0 seats.");
  }

  roomName = roomName.replace(/\s+/g, "_");

  const room = admin.database().ref(`Rooms/${roomName}`);
  try {
    const seatMap: { [key: number]: string } = {};

    for (let index = 1; index <= totalSeats; index++) {
      seatMap[index] = "none";
    }

    await room.set({map: seatMap});

    if (dimensions) {
      await room.update({dimensions});
    }
  } catch (error) {
    throw Error("Could not create room");
  }
};

export const deleteRoom = async (roomName: string) => {
  if (!roomName) {
    throw Error("Missing parameters.");
  }
  const query = admin.database().ref(`Rooms/${roomName}`);

  try {
    const snapshot = await query.once("value");
    if (snapshot.exists()) {
      await query.remove();
      return `${roomName} deleted.`;
    }
    return "Room not found.";
  } catch (error) {
    throw Error(`Could not delete ${roomName}`);
  }
};