/* eslint-disable @typescript-eslint/no-var-requires */
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as express from "express";
import * as cors from "cors";

const professorRoutes = require("./routes/professorRoutes");

admin.initializeApp();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/professor", professorRoutes );

/* app.get('/getAllRoomNames', async (req, res) => {
    try {
        const query = admin.database().ref('Rooms');
        const result = await query.once('value');
        const data = result.val();
        const roomNames = Object.keys(data || {});
        res.json({ roomNames });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});*/

export const api = functions.https.onRequest(app);
