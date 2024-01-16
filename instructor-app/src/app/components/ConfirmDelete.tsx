type resourceProp = {
    resource: string;
    resourceType: string;
};

export default function ConfirmDelete({
    resource,
    resourceType,
}: resourceProp) {
    return (
        <>
            <dialog id={`${resource}`} className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg capitalize">Delete {resourceType}?</h3>
                    <p className="py-4">
                        Are you sure you&apos;d like to delete{" "}
                        {`${resourceType}`} <span className="font-bold">{`${resource}`}</span>? All data for this{" "}
                        {`${resourceType}`} will be lost.{" "}
                    </p>
                    <div className="modal-action items-center justify-center">
                        <form method="dialog" className=" flex justify-center gap-6" >
                            <button className="btn btn-block">Cancel</button>
                            <button className="btn btn-error btn-block">Delete</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    );
}
