import * as admin from "firebase-admin";

// Log strucutre from DB
type LogEntry = {
    timeStamp: number;
    studentNumber: string;
}

// Define a type for the document structure
type AttendanceLogDocument = {
    startTime: { _seconds: number, _nanoseconds: number };
    endTime: { _seconds: number, _nanoseconds: number };
    logs: LogEntry[];
}

export const studentAttendanceLogs = async (
    courseCode: string, 
    studentNumber: string
    
    ) => {

    // Firestore db
    const db = admin.firestore();
    const attendanceLogsRef = db.collection("attendance-logs").doc(courseCode).collection("sorted-logs");

    // Get attendance logs
    const querySnapshot = await attendanceLogsRef.get();

    // Transform the documents to the desired format
    const formattedLogs = querySnapshot.docs.map(doc => {
        const data = doc.data() as AttendanceLogDocument;
        
        const startTime = data.startTime._seconds * 1000;
        const endTime = data.endTime._seconds * 1000;

        const studentLogs = data.logs
            .filter((log: LogEntry) => log.studentNumber === studentNumber)
            .map((log: LogEntry) => ({
                time: log.timeStamp
            }));

        // Return the formatted log entry with startTime, endTime, and logs array
        return {
            startTime: startTime,
            endTime: endTime,
            logs: studentLogs
        };
    });

    // Log and return the transformed logs
    console.log("Formatted logs data:", formattedLogs);
    return formattedLogs;
}