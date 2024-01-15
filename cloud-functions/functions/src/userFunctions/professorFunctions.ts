/* eslint-disable @typescript-eslint/no-explicit-any */
import * as express from "express";
import * as roomController from "../controllers/roomController";
import * as courseController from "../controllers/courseController";

// Room Functions
export const getAllRoomNames = async (
  _req: express.Request,
  res: express.Response
) => {
  try {
    const response = await roomController.roomNames();
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
    const response = await roomController.createRoom(
      roomName,
      numSeats,
      dimensions
    );
    res.status(200).json(response);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const deleteRoomByName = async (
  req: express.Request,
  res: express.Response
) => {
  const {roomName} = req.body;

  try {
    const response = await roomController.deleteRoom(roomName);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Course Functions
export const getAllCourses = async (
  _req: express.Request,
  res: express.Response
) => {
  try {
    const response = await courseController.courseNames();
    res.status(200).json(response);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const createNewCourse = async (
  req: express.Request,
  res: express.Response
) => {
  const {courseCode, courseName, room} = req.body;
  try {
    const response = await courseController.createCourse(
      courseCode,
      courseName,
      room
    );
    res.status(200).json(response);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const deleteCourseByCode = async (
  req: express.Request,
  res: express.Response
) => {
  const {courseCode} = req.body;

  try {
    const response = await courseController.deleteCourse(courseCode);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).send(error);
  }
};
