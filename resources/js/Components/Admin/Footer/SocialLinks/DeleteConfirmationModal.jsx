import React from "react";
import SecondaryButton from "@/Components/SecondaryButton";
import DangerButton from "@/Components/DangerButton";

const DeleteConfirmationModal = ({ visible, setVisible, handleDelete }) => {
    return (
        <div className="p-6">
            <h2 className="text-xl font-bold text-gray-900">
                Item Delete Confirmation
            </h2>
            <p className="m-0">Are You sure delete this item ?</p>
            <div className="mt-6 flex justify-end">
                <SecondaryButton onClick={() => setVisible(false)}>
                    No
                </SecondaryButton>
                <DangerButton onClick={handleDelete} className="ms-3">
                    Yes
                </DangerButton>
            </div>
        </div>
    );
};

export default DeleteConfirmationModal;
