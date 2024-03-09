import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

type Snapshot = {
  id: string;
  name: string;
  date: { _seconds: number; _nanoseconds: number };
};

async function getSnapshots(courseName: string) {
  const res = await fetch(
    `http://localhost:5001/student-attendance-capst-7115c/us-central1/api/professor/getCourseSnapshots/${courseName}`
    , { next: { revalidate: 300 } });

  if (!res.ok) {
    return [];
  }

  return await res.json();
}

export default async function Page({
  params,
}: {
  params: { courseName: string };
}) {
  const snapshots = await getSnapshots(params.courseName);

  const dateConversion = (seconds: number) => {
    const date = new Date(seconds * 1000);
    return date.toLocaleString("en-US");
  };

  return (
    <>
      <div className="min-h-screen bg-base-200">
        <div className="flex flex-col items-center xl:px-96 lg:px-64 px-16">
          <div className="card w-full bg-base-100 shadow-xl mt-16 py-6">
            <div className="card-body">
              <div className="flex flex-col md:flex-row justify-between items-baseline pb-4">
                <h2 className="card-title font-bold text-3xl mb-4 self-center">
                  <Link href={"/dashboard/attendance"}>
                    <FaArrowLeft />
                  </Link>
                  Snapshots for {params.courseName}
                </h2>
              </div>

              {snapshots && snapshots.length > 0 ?

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {snapshots.map((snapshot: Snapshot, index: number) => {
                    const formattedDate = dateConversion(snapshot.date._seconds);
                    return (
                      <Link
                        className="card bg-secondary text-primary-content"
                        href={`/dashboard/attendance/snapshots/${params.courseName}/${snapshot.id}`}
                        key={index}
                      >
                        <div className="card-body">
                          <h2 className="card-title">{snapshot.name}</h2>
                          <p>Snapshot for {formattedDate}</p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
                : <p className=" text-center text-lg mt-2">No snapshots available for this course.</p>
              }

            </div>
          </div>
        </div>
      </div>
    </>
  );
}
