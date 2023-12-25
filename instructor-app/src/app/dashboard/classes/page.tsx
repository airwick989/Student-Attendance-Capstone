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
    console.log(classes)

    return (
        <>
            <div className="min-h-screen bg-base-200">
                <div className="flex flex-col items-center xl:px-96 lg:px-64 px-16">

                    <div className="card w-full bg-base-100 shadow-xl mt-16 p-6 ">
                        <div className="card-body">
                            <h2 className="card-title font-bold text-3xl mb-4">My Classes</h2>

                            {Object.keys(classes).length == 0 ? <>No classes?</> : Object.keys(classes).map((classKey, index) => {
                                return (
                                    <div className="flex flex-col gap-2" key={index}>
                                        <div className="collapse collapse-close border border-base-300 bg-primary hover:bg-gradient-to-tl hover:from-violet-400 p-2">
                                            <div className="collapse-title text-xl font-medium text-primary-content">
                                                {`${classKey} - ${classes[classKey].courseName}`}
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