const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000; // Use the specified port or default to 3000

const classroomScan = require("./routes/classroomRoute");

app.use("/api/classroomScan", classroomScan);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDcmhZyoiG1mzymMFo6I0krgftFHdu3w4w",
  authDomain: "student-attendance-capst-7115c.firebaseapp.com",
  databaseURL: "https://student-attendance-capst-7115c-default-rtdb.firebaseio.com",
  projectId: "student-attendance-capst-7115c",
  storageBucket: "student-attendance-capst-7115c.appspot.com",
  messagingSenderId: "717318434583",
  appId: "1:717318434583:web:091fd99d9aa2c8f367d152",
  measurementId: "G-W3XZ0DS492"
};

// Initialize Firebase
const firebaseapp = initializeApp(firebaseConfig);
const db = getDatabase();