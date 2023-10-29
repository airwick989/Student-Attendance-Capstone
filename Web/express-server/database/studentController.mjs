// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyDcmhZyoiG1mzymMFo6I0krgftFHdu3w4w",
//   authDomain: "student-attendance-capst-7115c.firebaseapp.com",
//   databaseURL: "https://student-attendance-capst-7115c-default-rtdb.firebaseio.com",
//   projectId: "student-attendance-capst-7115c",
//   storageBucket: "student-attendance-capst-7115c.appspot.com",
//   messagingSenderId: "717318434583",
//   appId: "1:717318434583:web:091fd99d9aa2c8f367d152",
//   measurementId: "G-W3XZ0DS492"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

import db from "../firebase.mjs";
import { get, ref, set, update } from "firebase/database";

/*
function writeRoomData(roomNum) {
  const referenceSchedule = ref(db, "Rooms/" + roomNum + "/schedule/");
  set(referenceSchedule, {
    "8:10AM-9:30AM": "SOFE4590", //Embedded systems
    "9:40AM-11:00AM": "SOFE4850", //User Interfaces
    "11:10AM-12:30PM": "SOFE4790", //Distributed Systems
  });

  const referenceMap = ref(db, "Rooms/" + roomNum + "/map/");
  set(referenceMap, {
    1: "none",
    2: "none",
    3: "none",
    4: "none",
    5: "none",
    6: "none",
  });
}*/

const getStudentInfo = async (studentNum) => {
  if (!studentNum) {
    throw Error("No student number provided.");
  }

  const studentQuery = ref(db, `Students/${studentNum}`);
  const student = await get(studentQuery);

  if (!student.exists()) {
    throw Error(`Student number ${studentNum} not found.`);
  }

  return student.val();
};

const createStudent = (studentNum, prefName, fullName, pronouns) => {
  if (!studentNum || !fullName) {
    throw Error("Missing parameters.");
  }

  const student = ref(db, `Students/${studentNum}`);

  set(student, {
    fullName,
    prefName,
    pronouns,
  });
};

//setSeat("UA1350", "4", "100747897", "Ridwan Hossain", "they/them")
//writeRoomData("UA1350")

//export { setSeat };

//createStudent(100747897, "Ridwan", "Ridwan Hossain", "He/Him");

export { getStudentInfo, createStudent };
