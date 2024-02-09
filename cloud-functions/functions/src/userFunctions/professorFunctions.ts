/* eslint-disable @typescript-eslint/no-explicit-any */
import * as express from "express";
import * as roomController from "../controllers/roomController";
import * as courseController from "../controllers/courseController";
import * as classListController from "../controllers/classListController";
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

export const getRoomDetails = async (
  req: express.Request,
  res: express.Response
) => {
  const roomName = String(req.query.roomName);

  try {
    const response = await roomController.roomDetails(roomName);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).send(error);
  }
}

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

export const editExistingRoom = async (
  req: express.Request,
  res: express.Response
) => {
  const {oldRoomName, roomName, numSeats, dimensions} = req.body;

  try {
    const response = await roomController.editRoom(
      oldRoomName,
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

export const getCourseDetails = async (
  req: express.Request,
  res: express.Response
) => {
  const courseCode = String(req.query.courseCode);

  try {
    const response = await courseController.courseDetails(courseCode);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).send(error);
  }
}

export const createNewCourse = async (
  req: express.Request,
  res: express.Response,
  editFlag: boolean = false
) => {
  const bb = busboy({headers: req.headers});

  const formData: any = {};
  const studentList: any = [];
  let validFileType = true;

  bb.on("field", (fieldname, val) => {
    formData[fieldname] = val;
  });

  bb.on("file", (_fieldname: any, file: any, filename: any): void => {
    if (filename.mimeType && filename.mimeType !== "text/csv") {
      validFileType = false;
    }
    file.on("data", (data: any) => {
      const lines = data.toString().split("\n").slice(1);
      lines.forEach((line: any) => {
        if (line.trim() !== "") {
          const [studentName, studentId, sis, email, section] = line.split(",");
          studentList.push({
            studentId,
            studentName,
            sis,
            email,
            section,
          });
        }
      });
    });
  });

  bb.on("finish", async () => {
    const {oldCourseCode, courseCode, courseName, room, isFileChanged} = JSON.parse(formData.courseInfo);
    if (!validFileType) {
      return res.status(400).send({
        error: "Invalid file type, only CSV files allowed.",
      });
    }
    if(editFlag === false){
      try {
        const response = await courseController.createCourse(
          courseCode,
          courseName,
          room
        );
        await classListController.createClasslist(courseCode, studentList);
        return res.status(200).json(response);
      } catch (error) {
        return res.status(400).send({error: "Could not create course."});
      }
    }
    else{
      try {
        const response = await courseController.editCourse(
          oldCourseCode,
          courseCode,
          courseName,
          room
        );
        await classListController.editClasslist(oldCourseCode, courseCode, studentList, isFileChanged);
        return res.status(200).json(response);
      } catch (error) {
        return res.status(400).send({error: "Could not create course."});
      }
    }
  });
  req.on("error", (err) => {
    console.error(err);
    res.status(500).send("Internal Server Error");
  });

  bb.end(req.body);
};


export const editExistingCourse = async (
  req: express.Request,
  res: express.Response
) => {
  createNewCourse(req, res, true);
};


export const deleteCourseByCode = async (
  req: express.Request,
  res: express.Response
) => {
  const {courseCode} = req.body;
  try {
    await courseController.deleteCourse(courseCode);
    await classListController.deleteClasslist(courseCode);
    res.status(200).json({success: "Course deleted."});
  } catch (error) {
    res.status(400).send({error: "Could not delete course."});
  }
};
