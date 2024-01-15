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
} from "../userFunctions/professorFunctions";

router.get("/getAllRoomNames", getAllRoomNames);
router.get("/getAllClasses", getAllCourses);

router.post("/createRoom", createNewRoom);
router.post("/createCourse", createNewCourse);

router.delete("/deleteRoom", deleteRoomByName);
router.delete("/deleteCourse", deleteCourseByCode);

module.exports = router;
