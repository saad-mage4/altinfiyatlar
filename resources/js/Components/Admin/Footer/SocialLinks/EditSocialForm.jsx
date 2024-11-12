import { useState } from "react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import SecondaryButton from "@/Components/SecondaryButton";
import PrimaryButton from "@/Components/PrimaryButton";
import { useForm } from "@inertiajs/react";

const EditSocialForm = ({ setModal, selectedLink }) => {
    const { data, setData, put, processing, errors, progress } = useForm();

    const handleEditSubmit = (e) => {
        e.preventDefault();
        put(route("social-link-update", selectedLink?.id), {
            onSuccess: () => setModal(false),
        });
    };
    const handleImageChange = (e) => setData("icon", e.target.files[0]);

    return (
        <form onSubmit={handleEditSubmit} className="p-6">
            <h2 className="text-lg font-medium text-gray-900">
                Create Social Link
            </h2>
            <div className="mt-6">
                <InputLabel htmlFor="icon" value="Icon" />
                <TextInput
                    id="icon"
                    type="file"
                    name="icon"
                    value={data?.icon}
                    onChange={handleImageChange}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100"
                />
                {errors.icon && (
                    <p className="text-red-600 mt-2">{errors.icon}</p>
                )}
            </div>

            <div className="mt-6">
                <InputLabel htmlFor="link" value="Link" />
                <TextInput
                    id="link"
                    type="text"
                    name="link"
                    value={data.link}
                    onChange={(e) => setData("link", e.target.value)}
                    className="mt-1 block w-full"
                />
                {errors.link && (
                    <p className="text-red-600 mt-2">{errors.link}</p>
                )}
            </div>

            {progress && (
                <progress value={progress.percentage} max="100">
                    {progress.percentage}%
                </progress>
            )}
            <div className="mt-6 flex justify-end">
                <SecondaryButton onClick={() => setModal(false)}>
                    Cancel
                </SecondaryButton>
                <PrimaryButton className="ml-3" disabled={processing}>
                    {processing ? "Updating..." : "Update"}
                </PrimaryButton>
            </div>
        </form>
        //   <form onSubmit={handleEditSubmit} className="p-6">
        //       <h2 className="text-lg font-medium text-gray-900">Edit Link</h2>
        //       <div className="mt-4">
        //           <InputLabel htmlFor="name" value="Link Name" />
        //           <TextInput
        //               id="name"
        //               name="name"
        //               value={data.name}
        //               onChange={(e) => setData("name", e.target.value)}
        //               className="mt-1 block w-full"
        //           />
        //           {errors.name && (
        //               <div className="text-red-600 mt-2">{errors.name}</div>
        //           )}
        //       </div>
        //       <div className="mt-4">
        //           <InputLabel htmlFor="link" value="Link" />
        //           <TextInput
        //               id="link"
        //               name="link"
        //               value={data.link}
        //               onChange={(e) => setData("link", e.target.value)}
        //               className="mt-1 block w-full"
        //           />
        //           {errors.link && (
        //               <div className="text-red-600 mt-2">{errors.link}</div>
        //           )}
        //       </div>
        //       <div className="mt-6 flex justify-end">
        //           <SecondaryButton onClick={closeModals}>Close</SecondaryButton>
        //           <PrimaryButton
        //               type="submit"
        //               className="ml-2"
        //               disabled={processing}
        //           >
        //               {processing ? "Updating..." : "Update"}
        //           </PrimaryButton>
        //       </div>
        //   </form>
    );
};

export default EditSocialForm;
