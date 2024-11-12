import { useState } from "react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import SecondaryButton from "@/Components/SecondaryButton";
import PrimaryButton from "@/Components/PrimaryButton";
import { useForm } from "@inertiajs/react";
import IconPicker from "@/Components/UI/IconPicker";
// import IconPicker from "react-icons-picker";

const SocialLinkForm = ({ setModal }) => {
    const { data, setData, post, processing, errors, progress } = useForm({
        icon: null,
        link: "",
    });

    const [validationError, setValidationError] = useState("");

    const handleImageChange = (e) => setData("icon", e.target.files[0]);
    const handleIconChange = (selectedIcon) => {
        setData("icon", selectedIcon); // Update the icon data dynamically
    };

    const validateUrl = (url) => {
        if (!url) return true; // No URL provided, no validation needed

        // Check if the URL starts with 'http' or 'https'
        if (!url.startsWith("http://") && !url.startsWith("https://")) {
            setValidationError(
                "The link must start with 'http://' or 'https://'."
            );
            return false;
        }
        setValidationError(""); // Clear error if validation passes
        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Validate the URL before submitting
        if (!validateUrl(data?.link)) {
            return;
        }
        post(route("social-link.store"), {
            preserveScroll: true,
            onSuccess: () => setModal(false),
        });
    };

    return (
        <form onSubmit={handleSubmit} className="p-6">
            <h2 className="text-lg font-medium text-gray-900">
                Create Social Link
            </h2>
            <div className="mt-6">
                <InputLabel htmlFor="icon" value="Icon" />
                {/* <TextInput
                    id="icon"
                    type="file"
                    name="icon"
                    onChange={handleImageChange}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100"
                /> */}
                <IconPicker
                    value={data?.icon}
                    onChange={handleIconChange}
                    placeholder="Select an icon"
                />
                {errors.icon && (
                    <p className="text-red-600 mt-2">{errors.icon}</p>
                )}
            </div>

            {/* <IconPicker
                value={value}
                onChange={(v) => setValue(v)}
                size={24}
                color="#000"
            /> */}

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
                {validationError && (
                    <p className="text-red-600 mt-2">{validationError}</p>
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
                    {processing ? "Saving..." : "Save"}
                </PrimaryButton>
            </div>
        </form>
    );
};

export default SocialLinkForm;
