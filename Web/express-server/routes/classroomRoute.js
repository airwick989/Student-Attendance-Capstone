const express = require("express");
const router = express.Router();
const { studentSignIn } = require("../middleware/classroom");


router.post("/", studentSignIn);

module.exports = router;
