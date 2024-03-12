/* eslint-disable new-cap */
import * as express from "express";
const router = express.Router();
import {
  studentScan,
  studentLeaveSeat,
  studentAttendance,
} from "../userFunctions/studentFunctions";

router.post("/joinClass", studentScan);
router.patch("/leaveClass", studentLeaveSeat);
router.get("/attendance/:courseCode/:studentNumber", studentAttendance);

module.exports = router;
