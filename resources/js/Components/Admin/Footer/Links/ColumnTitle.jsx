import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import React from "react";

const ColumnTitle = ({ title, handleColUpdate }) => {
    const {
        data: columnData,
        setData: setColumnData,
        put: columnput,
        processing: processingColumn,
        errors: errorsColumn,
    } = useForm({
        title: title || "",
    });
    return (
        <div className="px-4 py-5 sm:p-6">
            <form onSubmit={handleColUpdate}>
                <div className="mb-4">
                    <InputLabel htmlFor="title" value="Column Title" />
                    <TextInput
                        id="title"
                        name="title"
                        value={columnData?.title || title}
                        onChange={(e) => setColumnData("title", e.target.value)}
                        className="mt-1 block w-full"
                        isFocused
                    />
                    {errorsColumn?.title && (
                        <div className="text-red-600 mt-2">
                            {errorsColumn.title}
                        </div>
                    )}
                </div>
                <div className="flex justify-end">
                    <PrimaryButton type="submit" disabled={processingColumn}>
                        {processingColumn ? "Updating..." : "Update"}
                    </PrimaryButton>
                </div>
            </form>
        </div>
    );
};

export default ColumnTitle;
