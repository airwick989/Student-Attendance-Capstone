import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

process.env.TZ = "America/New_York";

export const sessionService = functions.pubsub
  .schedule("every 5 minutes")
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  .onRun((context) => {
    const currentTime = new Date();

    return admin
      .database()
      .ref("/Courses")
      .once("value")
      .then((courseSnapshot) => {
        const promises: Promise<unknown>[] = [];

        courseSnapshot.forEach((course) => {
          const courseCode = course.key;
          const courseName = course.child("courseName").val();
          const meetingTimes = course.child("meetingTimes").val();
          const room = course.child("Room").val()[0];

          console.log("Course: ", courseCode);
          console.log("Course Name: ", courseName);
          console.log("Room: ", room);
          console.log("Meeting Times: ", meetingTimes);

          if (meetingTimes) {
            let setActiveClass = false;

            meetingTimes.forEach(
              (meetingTime: { meetingDate: string; timeRange: string[] }) => {
                const meetingDate = meetingTime.meetingDate;
                const timeRange = meetingTime.timeRange;

                const matchDate = isMatchingMeetingDate(
                  currentTime,
                  meetingDate
                );
                const withinTimeRange = isWithinTimeRange(
                  currentTime,
                  timeRange
                );

                console.log(
                  matchDate,
                  withinTimeRange,
                  "Current Time: ",
                  currentTime
                );

                if (matchDate && withinTimeRange) {
                  console.log("Setting activeClass for room: ", room);
                  setActiveClass = true;
                }
              }
            );

            if (setActiveClass) {
              promises.push(
                admin
                  .database()
                  .ref(`Rooms/${room}/activeClass`)
                  .set({courseCode, courseName})
              );
            } else {
              console.log("Resetting activeClass for room: ", room);
              promises.push(
                admin.database().ref(`Rooms/${room}/activeClass`).set("")
              );
            }
          }
        });

        return Promise.all(promises);
      })
      .catch((error) => {
        console.error("Error setting activeClass:", error);
      });
  });

const isMatchingMeetingDate = (currentTime: Date, meetingDate: string) => {
  const currentDay = currentTime
    .toLocaleString("en-US", {weekday: "long", timeZone: "America/New_York"})
    .toLowerCase();
  return currentDay === meetingDate.toLowerCase();
};

const isWithinTimeRange = (currentTime: Date, timeRange: string[]) => {
  let hours: number | string = currentTime.getHours();
  let minutes: number | string = currentTime.getMinutes();

  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  const formattedTime = `${hours}:${minutes}`;
  const [startTime, endTime] = timeRange;

  return formattedTime >= startTime && formattedTime <= endTime;
};
