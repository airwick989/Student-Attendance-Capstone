const express = require("express");
const router = express.Router();
const {
    classroomScan
} = require("../middleware/professorFunctions");

router.get("/classList/:id", classroomScan );

module.exports = router;
