import Link from "next/link";

async function getClasses() {
    try {
        const res = await fetch("http://localhost:5001/student-attendance-capst-7115c/us-central1/api/professor/getAllClasses", { cache: 'force-cache' })
        return res.json()
    } catch (e) {
        return {}
    }
}

export default async function Page() {

    const classes = await getClasses();

    return (
        <>
            <div className="min-h-screen bg-base-200">
                <div className="flex flex-col items-center xl:px-96 lg:px-64 px-16">

                    <div className="card w-full bg-base-100 shadow-xl mt-16 p-6 ">
                        <div className="card-body">
                            <h2 className="card-title font-bold text-3xl mb-4">My Courses</h2>

                            {Object.keys(classes).length == 0 ? (<>
                                <p className="self-center text-lg mt-2">No classes found.</p>
                                <Link href={"/dashboard"} className="btn btn-primary max-w-lg mt-6 self-center">Add Class</Link>
                            </>) : Object.keys(classes).map((classKey, index) => {
                                return (
                                    <div className="flex flex-col gap-2" key={index}>
                                        <div className="collapse collapse-arrow border border-base-300 bg-primary hover:bg-gradient-to-tl hover:from-violet-400 p-2">
                                            <input type="checkbox" />

                                            <div className="collapse-title text-xl text-primary-content font-semibold">
                                                {`${classKey} - ${classes[classKey].courseName}`}
                                            </div>
                                            <div className="collapse-content font-medium text-secondary-content self-center">
                                                <div className="grid place-items-center grid-cols-1 gap-3">

                                                    <Link href={`./rooms/${classes[classKey].Room}`} className="btn btn-wide">{classes[classKey].Room}</Link>

                                                </div>

                                            </div>
                                        </div>

                                    </div>


                                )
                            })}

                        </div>
                    </div>

                </div>

            </div>

        </>
    )
}