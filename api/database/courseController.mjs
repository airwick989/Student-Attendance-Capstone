import db from "../firebase.mjs";
import { ref, set, update } from "firebase/database";

//TODO: Replace student list with enroll student function
const studentList = {
  100747897: {
    prefName: "Ridwan Hossain",
    pronouns: "He/Him",
  },
  100689142: {
    prefName: "Saaransh Mohammed",
    pronouns: "My/Guy",
  },
};

function writeCourseData(courseCode, courseName, roomNum) {
  if (!courseCode || !courseName || !roomNum) {
    throw Error("Missing parameters");
  }

  if (!ref(db, `Rooms/${roomNum}`)) {
    throw Error("Could not find room specified.");
  }

  try {
    const reference = ref(db, "Courses/" + courseCode);
    set(reference, {
      Room: `${roomNum}`,
      courseName,
      studentList: studentList,
    });
    return `Course ${courseCode}:${courseName} created for room ${roomNum}`;
  } catch (e) {
    throw Error("Could not create course data.");
  }
}

export { writeCourseData };

writeCourseData("SOFE4590", "Embedded Systems", "UA1350");
