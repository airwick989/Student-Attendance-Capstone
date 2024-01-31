/* eslint-disable @typescript-eslint/no-explicit-any */
import * as express from "express";
import * as roomController from "../controllers/roomController";
import * as courseController from "../controllers/courseController";
import * as busboy from "busboy";

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
  const bb = busboy({headers: req.headers});

  const formData: any = {};

  bb.on("field", (fieldname, val) => {
    formData[fieldname] = val;
  });

  bb.on(
    "file",
    (
      fieldname: any,
      file: any,
      filename: any,
      encoding: any,
      mimetype: any
    ): void => {
      console.log(fieldname, file, filename, encoding, mimetype);

      file.on("data", (data: any) => {
        const lines = data.toString().split("\n");
        lines.forEach((line: any) => {
          const [studentId, studentName, sis, email] = line.split(",");
          console.log(studentId, studentName, sis, email);
          /* courseController.addStudentToCourse(
            JSON.parse(formData.courseInfo).courseCode,
            studentId,
            studentName
          ); */
        });
      });
      file.resume();
    }
  );

  bb.on("finish", async () => {
    const {courseCode, courseName, room} = JSON.parse(formData.courseInfo);
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
  });
  req.on("error", (err) => {
    console.error(err);
    res.status(500).send("Internal Server Error");
  });

  bb.end(req.body);
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
