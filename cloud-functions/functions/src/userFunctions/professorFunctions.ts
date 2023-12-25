/* eslint-disable @typescript-eslint/no-explicit-any */
import * as admin from "firebase-admin";
import * as express from "express";

export const getAllRoomNames = async (
  _req: express.Request,
  res: express.Response
) => {
  try {
    const query = admin.database().ref("Rooms");
    const result = await query.once("value");
    const data = result.val();
    const roomNames = Object.keys(data || {});
    res.json({roomNames});
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

export const getAllCourses = async (
  _req: express.Request,
  res: express.Response
) => {
  try {
    const query = admin.database().ref("Courses");
    const result = await query.once("value");
    res.status(200).json(result);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};
