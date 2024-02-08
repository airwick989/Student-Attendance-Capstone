import * as express from "express";
import * as seatController from "../controllers/seatController";

export const studentScan = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const {studentName, roomName, seatNumber} = req.body;
    const response = await seatController.setSeat(
      studentName,
      seatNumber,
      roomName
    );
    res.status(200).json({response: response});
  } catch (e) {
    res.status(400).json({error: e});
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
    res.status(400).json({error: "Could not empty seat"});
  }
};
