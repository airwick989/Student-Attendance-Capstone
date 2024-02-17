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
  getRoomDetails,
  editExistingRoom,
  getCourseDetails,
  editExistingCourse,
} from "../userFunctions/professorFunctions";

router.get("/getAllRoomNames", getAllRoomNames);
router.get("/getAllClasses", getAllCourses);
router.get("/editRoom", getRoomDetails);
router.get("/editCourse", getCourseDetails);

router.post("/createRoom", createNewRoom);
router.post("/createCourse", (req, res) => createNewCourse(req, res, false));
router.post("/updateRoom", editExistingRoom);
router.post("/updateCourse", editExistingCourse);

router.delete("/deleteRoom", deleteRoomByName);
router.delete("/deleteCourse", deleteCourseByCode);

module.exports = router;
