export default function Page() {

    return (
        <>
            <div className="min-h-screen bg-base-200">
                <div className="flex flex-col items-center xl:px-96 lg:px-64 px-16">

                    <div className="card w-full bg-base-100 shadow-xl mt-16 p-6 ">
                        <div className="card-body">
                            <h2 className="card-title font-bold text-3xl mb-4">My Classes</h2>

                            <div className="flex flex-col gap-2">
                                <div className="collapse collapse-close border border-base-300 bg-primary p-2">
                                    <div className="collapse-title text-xl font-medium text-primary-content">
                                        Class 1
                                    </div>
                                </div>

                                <div className="collapse collapse-close border border-base-300 bg-primary p-2">
                                    <div className="collapse-title text-xl font-medium text-primary-content">
                                        Class 2
                                    </div>
                                </div>

                                <div className="collapse collapse-close border border-base-300 bg-primary p-2">
                                    <div className="collapse-title text-xl font-medium text-primary-content">
                                        Class 3
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>

                </div>

            </div>

        </>
    )
}