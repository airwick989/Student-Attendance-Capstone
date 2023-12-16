const express = require("express");
const router = express.Router();
const {
  studentScan,
  studentLeaveSeat,
} = require("../middleware/studentFunctions");

router.post("/", studentScan);
router.patch("/leave", studentLeaveSeat);

module.exports = router;
