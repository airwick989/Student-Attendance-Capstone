import {
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

export default function AttendanceCharts({data}:any) {

    return (
        <>
            <div className="flex flex-col md:flex-row gap-6 bg-base-200 card p-6">
                <div className="card min-w-md w-full">
                    <h2 className="card-title font-bold text-lg mb-4 justify-center">
                        Student Attendance
                    </h2>
                    <ResponsiveContainer width={"100%"} height={300}>
                        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                            <Line type="monotone" dataKey="students" stroke="#8884d8" />
                            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                            <XAxis dataKey="name"/>
                            <YAxis />
                            <Tooltip />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
                <div className="divider md:divider-horizontal"></div>
                <div className="card min-w-md w-full">
                    <h2 className="card-title font-bold text-lg mb-4 justify-center">
                        Attendance Rate (%)
                    </h2>
                    <ResponsiveContainer width={"100%"} height={300}>
                        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                            <Line type="monotone" dataKey="rate" stroke="#de7200" />
                            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </>
    );
}
