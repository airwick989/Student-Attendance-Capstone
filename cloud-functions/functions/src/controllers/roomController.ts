import * as admin from "firebase-admin";

export const roomNames = async () => {
  const query = admin.database().ref("Rooms");
  const result = await query.once("value");
  const data = result.val();
  const roomNames = Object.keys(data || {});

  return roomNames;
};

export const roomDetails = async (roomName: string) => {
  const queryDimensions = admin.database().ref(`Rooms/${roomName}/dimensions`);
  const queryMap = admin.database().ref(`Rooms/${roomName}/map`);

  try {
    const dimSnapshot = await queryDimensions.once("value");
    const dimensions = dimSnapshot.val();

    const mapSnapshot = await queryMap.once("value");
    const map = mapSnapshot.val();
    const seatNum = map.length - 1;

    return {
      dimensions: dimensions,
      seatNum: seatNum,
    };
  } catch (error) {
    console.error("Error fetching room details:", error);
    throw error; // Re-throw the error if needed
  }
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

// TODO: need to search and delete room from Courses
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
