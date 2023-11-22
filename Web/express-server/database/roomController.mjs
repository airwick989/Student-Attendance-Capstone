import db from "../firebase.mjs";

import { ref, set, update, get, child } from "firebase/database";

const createRoom = async (roomNum, numberOfSeats) => {
  if (!roomNum || !numberOfSeats) {
    throw Error("Missing parameters.");
  }

  if (numberOfSeats == 0) {
    throw Error("Cannot have 0 seats.");
  }

  //Uncomment below if you want to prevent rooms from being overwritten
  //const room = ref(db, `Rooms/${roomNum}/`);
  const roomMap = ref(db, `Rooms/${roomNum}/map/`);

  /*if ((await get(room)).exists()) {
    throw Error(`Room ${roomNum} already exists.`);
  }*/

  const seatMap = {};

  //Creating student map
  for (let i = 1; i <= numberOfSeats; i++) {
    seatMap[i] = "none";
  }
  set(roomMap, seatMap);

  return `Room ${roomNum} created.`;
};

const setRoomSchedule = async (roomNum, courseCode, startTime, endTime) => {
  if (!roomNum || !courseCode || !startTime || !endTime) {
    throw Error("Missing parameters");
  }

  const room = ref(db, `Rooms/${roomNum}/`);
  if (!(await get(room)).exists()) {
    throw Error(`Room ${roomNum} does not exist.`);
  }

  const course = ref(db, `Courses/${courseCode}/`);
  if (!(await get(course)).exists()) {
    throw Error(`Course ${courseCode} does not exist.`);
  }

  const schedule = child(room, "schedule/");

  //Will need to see if frontend passes UTC or regular string
  //to check if schedules conflict

  update(schedule, {
    [`${startTime} - ${endTime}`]: courseCode,
  });
};


export { createRoom, setRoomSchedule };

//createRoom("UA1350", 10);

//setRoomSchedule("The BackRooms", "SOFE4590", "10:00AM", "12:00PM");
