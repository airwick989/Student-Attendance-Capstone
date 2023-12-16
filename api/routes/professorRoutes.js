const express = require("express");
const router = express.Router();
const {
    classroomScan, endClass
} = require("../middleware/professorFunctions");

router.get("/classList/:id", classroomScan );
router.patch("/:id/end", endClass);


module.exports = router;
