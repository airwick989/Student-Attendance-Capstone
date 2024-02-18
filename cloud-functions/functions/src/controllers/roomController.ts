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

export const editRoom = async (
  oldRoomName: string,
  roomName: string,
  totalSeats: number,
  dimensions?: { rows: number; columns: number }
) => {
  // Probably need to edit this, pretty sure all this is unnecessary,
  // and all you need is just the old room name comparison with the new one
  if (oldRoomName === roomName) {
    const roomRef = admin.database().ref(`Rooms/${roomName}`);

    if (totalSeats == 0) {
      throw Error("Cannot have 0 seats.");
    }

    try {
      const seatMap: { [key: number]: string } = {};

      for (let index = 1; index <= totalSeats; index++) {
        seatMap[index] = "none";
      }

      await roomRef.set({map: seatMap});

      if (dimensions) {
        await roomRef.update({dimensions});
      }
    } catch (error) {
      throw Error("Could not update room");
    }
  } else {
    try {
      createRoom(roomName, totalSeats, dimensions);

      // Remove old room node
      const oldRoomRef = admin.database().ref(`Rooms/${oldRoomName}`);
      await oldRoomRef.remove();
    } catch (error) {
      throw Error("Could not update room");
    }
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
      const courseQuery = admin.database().ref("Courses");
      const courseSnapshot = await courseQuery.once("value");

      for (const course in courseSnapshot.val()) {
        if (
          Object.prototype.hasOwnProperty.call(courseSnapshot.val(), course)
        ) {
          const roomQuery = admin.database().ref(`Courses/${course}/Room`);
          const roomSnapshot = await roomQuery.once("value");
          const rooms = roomSnapshot.val();

          if (rooms && rooms.includes(roomName)) {
            const index = rooms.indexOf(roomName);
            rooms.splice(index, 1);
            await roomQuery.set(rooms);
          }
        }
      }

      await query.remove();
      return `${roomName} deleted.`;
    }
    return "Room not found.";
  } catch (error) {
    throw Error(`Could not delete ${roomName}`);
  }
};
