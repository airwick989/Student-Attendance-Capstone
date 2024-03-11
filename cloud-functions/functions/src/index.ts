/* eslint-disable @typescript-eslint/no-var-requires */
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as express from "express";
import * as cors from "cors";

import {sessionService} from "./backing-services/sessionService";
import {attendanceLogger} from "./backing-services/attendanceLogger";
import {processAttendance} from "./backing-services/processAttendance";

const professorRoutes = require("./web-functions/routes/professorRoutes");
const studentRoutes = require("./mobile-functions/routes/studentRoutes");

admin.initializeApp();

const app = express();
const mobileApp = express();

app.use(cors());
app.use(express.json());
app.use("/professor", professorRoutes);

mobileApp.use(cors());
mobileApp.use(express.json());
mobileApp.use("/student", studentRoutes);

export const api = functions.https.onRequest(app);
export const mobileApi = functions.https.onRequest(mobileApp);
export const session = sessionService;
export const attendance = attendanceLogger;
export const attendanceSortService = processAttendance;
