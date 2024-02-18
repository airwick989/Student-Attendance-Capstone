/* eslint-disable new-cap */
import * as express from "express";
const router = express.Router();
import {
  studentScan,
  studentLeaveSeat,
} from "../userFunctions/studentFunctions";

router.post("/joinClass", studentScan);
router.patch("/leaveClass", studentLeaveSeat);

module.exports = router;
