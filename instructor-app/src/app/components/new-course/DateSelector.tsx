import TimeRangePicker from "@wojtekmaj/react-timerange-picker";
import "@wojtekmaj/react-timerange-picker/dist/TimeRangePicker.css";
import "react-clock/dist/Clock.css";

export default function DateSelector({ index, data, handleDateChange, handleTimeRangeChange }: any) {

    return (
        <>
            <div className="flex lg:flex-row gap-4 flex-col overflow-x-auto">
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">Meeting Day</span>
                    </div>
                    <select
                        className="select select-bordered"
                        required
                        onChange={e=>handleDateChange(e, index)}
                        value={data.meetingTimes[index] ? data.meetingTimes[index].meetingDate : ""}
                        name="meetingDate"
                    >
                        <option value={""}>
                            select a meeting day:
                        </option>
                        <option>Monday</option>
                        <option>Tuesday</option>
                        <option>Wednesday</option>
                        <option>Thursday</option>
                        <option>Friday</option>
                        <option>Saturday</option>
                        <option>Sunday</option>
                    </select>
                </label>
            </div>

            <label className="form-control w-full">
                <div className="label">
                    <span className="label-text">Meeting Time</span>
                </div>
                <TimeRangePicker
                    onChange={e=>handleTimeRangeChange(e, index)}
                    value={data.meetingTimes[index] ? data.meetingTimes[index].timeRange : ""}
                    className="w-full input p-0.5"
                    required
                    disableClock
                />
            </label>
        </>
    );
}
