/* eslint-disable new-cap */
import * as express from "express";
const router = express.Router();
import {
  getAllRoomNames,
  getAllCourses,
  deleteRoomByName,
  createNewRoom,
} from "../userFunctions/professorFunctions";

router.get("/getAllRoomNames", getAllRoomNames);
router.get("/getAllClasses", getAllCourses);
router.post("/createRoom", createNewRoom);
router.delete("/deleteRoom", deleteRoomByName);

module.exports = router;
