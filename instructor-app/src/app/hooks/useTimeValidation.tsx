import { useState } from "react";

export default function useTimeValidation() {
    const [validTime, setValidTime] = useState(false);

    const timeValidator = (meetingTimes: any) => {
        for (const meetingTime of meetingTimes) {
            const { meetingDate, timeRange } = meetingTime;
            if (!meetingDate || !timeRange[0] || !timeRange[1]) {
                return setValidTime(false);
            }
            const [startTime, endTime] = timeRange;
            if (startTime >= endTime) {
                return setValidTime(false);
            }
        }
        if (meetingTimes[1]) {
            if (
                meetingTimes[0].meetingDate === meetingTimes[1].meetingDate
            ) {
                if (
                    meetingTimes[0].timeRange[0] ===
                    meetingTimes[1].timeRange[0] &&
                    meetingTimes[0].timeRange[1] ===
                    meetingTimes[1].timeRange[1]
                ) {
                    return setValidTime(false);
                }
            }
        }
        for (let i = 0; i < meetingTimes.length; i++) {
            const { meetingDate: date1, timeRange: range1 } = meetingTimes[i];
            for (let j = i + 1; j < meetingTimes.length; j++) {
                const { meetingDate: date2, timeRange: range2 } = meetingTimes[j];
                if (date1 === date2) {
                    const [start1, end1] = range1;
                    const [start2, end2] = range2;
                    if (!(end1 <= start2 || start1 >= end2)) {
                        return setValidTime(false);
                    }
                }
            }
        }
        
        return setValidTime(true);
    };
    return { timeValidator, validTime };
}