import * as express from "express";
import * as seatController from "../controllers/seatController";

export const studentScan = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const {
      roomName,
      seatNumber,
      courseCode,
      studentNumber,
      pronouns,
      preferredName,
    } = req.body;
    const response = await seatController.setSeat(
      seatNumber,
      roomName,
      courseCode,
      studentNumber,
      pronouns,
      preferredName
    );
    res.status(200).json({response: response});
  } catch (e) {
    res.status(400).json({error: (e as Error).message});
  }
};

export const studentLeaveSeat = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const {roomName, seatNumber} = req.body;

    const response = await seatController.emptySeat(roomName, seatNumber);

    res.status(200).json({response: response});
  } catch (e) {
    res.status(400).json({error: (e as Error).message});
  }
};
