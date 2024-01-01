/* eslint-disable @typescript-eslint/no-explicit-any */
import * as express from "express";
import {
  roomNames,
  deleteRoom,
  createRoom,
} from "../controllers/roomController";
import {courseNames} from "../controllers/courseController";

export const getAllRoomNames = async (
  _req: express.Request,
  res: express.Response
) => {
  try {
    const response = await roomNames();
    res.status(200).json(response);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const createNewRoom = async (
  req: express.Request,
  res: express.Response
) => {
  const {roomName, numSeats, dimensions} = req.body;

  try {
    const response = await createRoom(roomName, numSeats, dimensions);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const deleteRoomByName = async (
  req: express.Request,
  res: express.Response
) => {
  const roomName = req.body;

  try {
    const response = await deleteRoom(roomName.name);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const getAllCourses = async (
  _req: express.Request,
  res: express.Response
) => {
  try {
    const response = await courseNames();
    res.status(200).json(response);
  } catch (error) {
    res.status(400).send(error);
  }
};
