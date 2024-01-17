type resourceProp = {
    resource: string;
    setResource: any;
    resourceList: Array<string>;
};

export default function ConfirmDeleteRoom({
    resource,
    setResource,
    resourceList,
}: resourceProp) {
    
    const deleteResource = async () => {
        try {
            const response = await fetch(
                "http://localhost:5001/student-attendance-capst-7115c/us-central1/api/professor/deleteRoom",
                {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ roomName: resource }),
                }
            );
            if (response.ok) {
                setResource(
                    resourceList.filter((value) => {
                        return value !== resource;
                    })
                );
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <>
            <dialog id={`${resource}`} className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg capitalize">Delete Room?</h3>
                    <p className="py-4">
                        Are you sure you&apos;d like to delete room{" "}
                        <span className="font-bold">{`${resource}`}</span>? All data for
                        this room will be lost.{" "}
                    </p>
                    <div className="modal-action items-center justify-center">
                        <form method="dialog" className=" flex justify-center gap-6">
                            <button className="btn btn-block">Cancel</button>
                            <button
                                className="btn btn-error btn-block"
                                onClick={() => {
                                    deleteResource();
                                }}
                            >
                                Delete
                            </button>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    );
}
