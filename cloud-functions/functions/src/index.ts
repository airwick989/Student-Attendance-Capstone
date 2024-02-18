/* eslint-disable @typescript-eslint/no-var-requires */
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as express from "express";
import * as cors from "cors";

const professorRoutes = require("./routes/professorRoutes");
const studentRoutes = require("./routes/studentRoutes");

admin.initializeApp();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/professor", professorRoutes);
app.use("/student", studentRoutes);

export const api = functions.https.onRequest(app);


/* exports.initializeMobileUser = functions.auth
  .user()
  .onCreate(async (user) => {
    console.log("User created:", user.uid);
  });
*/
