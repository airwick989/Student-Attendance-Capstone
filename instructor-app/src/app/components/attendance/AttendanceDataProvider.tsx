import React, { createContext, useContext, useState } from "react";

interface AttendanceData {
    [course: string]: { name: string; students: number; rate: number }[];
}

const defaultValue: AttendanceData = {};

const AttendanceDataContext = createContext<{
    attendanceData: AttendanceData;
    updateAttendanceData: (
        course: string,
        data: { name: string; students: number; rate: number }[]
    ) => void;
}>({
    attendanceData: defaultValue,
    updateAttendanceData: () => { },
});

export const useAttendanceData = () => {
    return useContext(AttendanceDataContext);
};

interface AttendanceDataProviderProps {
    children: React.ReactNode;
}

export const AttendanceDataProvider: React.FC<AttendanceDataProviderProps> = ({
    children,
}) => {
    const [attendanceData, setAttendanceData] =
        useState<AttendanceData>(defaultValue);

    const updateAttendanceData = (
        course: string,
        data: { name: string; students: number; rate: number }[]
    ) => {
        setAttendanceData((prevData) => ({
            ...prevData,
            [course]: data,
        }));
    };

    return (
        <AttendanceDataContext.Provider
            value={{ attendanceData, updateAttendanceData }}
        >
            {children}
        </AttendanceDataContext.Provider>
    );
};
