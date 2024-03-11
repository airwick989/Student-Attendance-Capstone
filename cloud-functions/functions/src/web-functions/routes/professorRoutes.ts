/* eslint-disable new-cap */
import * as express from "express";
const router = express.Router();
import {
  getAllRoomNames,
  getAllCourses,
  deleteRoomByName,
  deleteCourseByCode,
  createNewRoom,
  createNewCourse,
  createCourseSnapshot,
  getRoomDetails,
  editExistingRoom,
  getCourseDetails,
  editExistingCourse,
  resetRoomByName,
  getAllCourseSnapshots,
  getCourseSnapshot,
  getCourseAttendanceLogs,
  getSingleAttendanceLog,
} from "../userFunctions/professorFunctions";

router.get("/getAllRoomNames", getAllRoomNames);
router.get("/getAllClasses", getAllCourses);
router.get("/editRoom", getRoomDetails);
router.get("/editCourse", getCourseDetails);

router.get("/getCourseSnapshots/:courseCode", getAllCourseSnapshots);
router.get("/getCourseSnapshots/:courseCode/:snapshotID", getCourseSnapshot);
router.get("/getAllAttendanceLogs/:courseCode", getCourseAttendanceLogs);
router.get(
  "/getAllAttendanceLogs/:courseCode/:timeStamp",
  getSingleAttendanceLog
);

router.post("/createRoom", createNewRoom);
router.post("/createCourse", (req, res) => createNewCourse(req, res, false));
router.post("/createCourseSnapshot", createCourseSnapshot);
router.post("/updateRoom", editExistingRoom);
router.post("/updateCourse", editExistingCourse);

router.delete("/deleteRoom", deleteRoomByName);
router.delete("/deleteCourse", deleteCourseByCode);

router.patch("/resetRoom/:roomName", resetRoomByName);

module.exports = router;
