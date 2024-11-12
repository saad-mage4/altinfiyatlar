import { useForm } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import AdminLayout from "@/Layouts/admin/AdminLayout";

const Footer = ({ auth, footer }) => {
    const { data, setData, post, errors, processing, recentlySuccessful } =
        useForm({
            email: footer?.email || "",
            phone: footer?.phone || "",
            address: footer?.address || "",
            image_title: footer?.image_title || "",
            copyright: footer?.copyright || "",
            card_image: null,
        });
    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("footer.store"), {
            preserveScroll: true,
            // onSuccess: (data) => console.log(data),
        });
    };
    const handleImageChange = (e) => {
        setData("card_image", e.target.files[0]);
    };
    return (
        <AdminLayout auth={auth} header="Footer" title="Footer Page |">
            <div className="container">
                <form
                    className="grid grid-cols-1 md:grid-cols-12 gap-x-6 gap-y-8"
                    onSubmit={handleSubmit}
                >
                    <div className="sm:col-span-4">
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Email <span className="text-red-600">*</span>
                        </label>
                        <div className="mt-2">
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="block w-full rounded-md border-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                value={data.email}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                            />
                            {errors.email && (
                                <div className="text-red-600 mt-1">
                                    {errors.email}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="sm:col-span-4">
                        <label
                            htmlFor="phone"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Phone <span className="text-red-600">*</span>
                        </label>
                        <div className="mt-2">
                            <input
                                type="text"
                                id="phone"
                                name="phone"
                                className="block w-full rounded-md border-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                value={data.phone}
                                onChange={(e) =>
                                    setData("phone", e.target.value)
                                }
                            />
                            {errors.phone && (
                                <div className="text-red-600 mt-1">
                                    {errors.phone}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="sm:col-span-4">
                        <label
                            htmlFor="address"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Address <span className="text-red-600">*</span>
                        </label>
                        <div className="mt-2">
                            <input
                                type="text"
                                id="address"
                                name="address"
                                className="block w-full rounded-md border-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                value={data.address}
                                onChange={(e) =>
                                    setData("address", e.target.value)
                                }
                            />
                            {errors.address && (
                                <div className="text-red-600 mt-1">
                                    {errors.address}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="sm:col-span-12">
                        <label className="block text-sm font-medium leading-6 text-gray-900">
                            Existing Image
                        </label>
                        <div className="mt-2">
                            <img
                                src={`../${footer?.payment_image}`}
                                // src={`../images/${footer?.payment_image}`}
                                alt="Existing"
                                width="220px"
                            />
                        </div>
                    </div>

                    <div className="sm:col-span-4">
                        <label
                            htmlFor="card_image"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Payment Card Image
                        </label>
                        <div className="mt-2">
                            <input
                                type="file"
                                id="card_image"
                                name="card_image"
                                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100"
                                onChange={handleImageChange}
                            />
                            {errors.card_image && (
                                <div className="text-red-600 mt-1">
                                    {errors.card_image}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="sm:col-span-4">
                        <label
                            htmlFor="image_title"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Image Title <span className="text-red-600">*</span>
                        </label>
                        <div className="mt-2">
                            <input
                                type="text"
                                id="image_title"
                                name="image_title"
                                className="block w-full rounded-md border-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                value={data.image_title}
                                onChange={(e) =>
                                    setData("image_title", e.target.value)
                                }
                            />
                            {errors.image_title && (
                                <div className="text-red-600 mt-1">
                                    {errors.image_title}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="sm:col-span-4">
                        <label
                            htmlFor="copyright"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Copyright <span className="text-red-600">*</span>
                        </label>
                        <div className="mt-2">
                            <input
                                type="text"
                                id="copyright"
                                name="copyright"
                                className="block w-full rounded-md border-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                value={data.copyright}
                                onChange={(e) =>
                                    setData("copyright", e.target.value)
                                }
                            />
                            {errors.copyright && (
                                <div className="text-red-600 mt-1">
                                    {errors.copyright}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="sm:col-span-12">
                        <PrimaryButton disabled={processing}>
                            {processing ? "Updating..." : "Update"}
                        </PrimaryButton>
                        {/* <button
                                                type="submit"
                                                className="mt-6 w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                                disabled={processing}
                                            >
                                                {processing
                                                    ? "Updating..."
                                                    : "Update"}
                                            </button> */}
                        {recentlySuccessful && (
                            <div className="text-green-600 mt-2">
                                Updated successfully!
                            </div>
                        )}
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
};

export default Footer;
