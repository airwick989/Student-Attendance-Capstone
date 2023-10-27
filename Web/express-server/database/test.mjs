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


import db from '../firebase.mjs';
import { ref, set } from 'firebase/database';

function writeStudentData(roomNum, building){
    const reference =ref(db, 'Rooms/' + roomNum);
    set(reference, {
        "8:10AM-9:30AM": "Embedded Systems",
        "9:40AM-11:00AM": "User Interfaces",
        "11:10AM-12:30PM": "Distributed Systems"
    });
}

writeStudentData("UA1350");