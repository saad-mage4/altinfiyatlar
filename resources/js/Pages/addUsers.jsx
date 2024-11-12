import NavLink from "@/Components/NavLink";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import { PhotoIcon } from "@heroicons/react/24/solid";

const addUsers = ({ auth }) => {
    const { data, setData, post, errors, processing, recentlySuccessful } =
        useForm({
            name: "",
            email: "",
            avatar: null,
            // status: "",
        });

    const submit = (e) => {
        e.preventDefault();
        post(route("save-users"), {
            preserveScroll: true,
            onSuccess: () => {},
        });
    };

    const getName = (e) => {
        let fileName = document.querySelector(".show-file-name");
        fileName.innerHTML = e.target.files[0].name;
        setData("avatar", e.target.files[0]);
    };

    return (
        <>
            <AuthenticatedLayout
                user={auth.user}
                header={
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Users
                    </h2>
                }
            >
                <Head title="Articles Page | " />

                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6 text-gray-900">
                                <section className="articles-section">
                                    <header className="relative">
                                        <h2 className="text-lg font-medium text-gray-900">
                                            Add Users
                                        </h2>

                                        <p className="mt-1 text-sm text-gray-600">
                                            here you can add an User.
                                        </p>
                                        <NavLink
                                            href={route("Users")}
                                            className="absolute top-2/4 -translate-y-2/4 right-0 bg-blue-700 text-white px-4 py-1 rounded hover:text-white shadow-none border-2 border-[#f0b90a] focus:text-white"
                                        >
                                            User List
                                        </NavLink>
                                    </header>
                                    <div className="container">
                                        <form
                                            className="grid grid-cols-1 md:grid-cols-12 gap-x-6 gap-y-8"
                                            onSubmit={submit}
                                        >
                                            <div className="sm:col-span-4">
                                                <label
                                                    htmlFor="name"
                                                    className="block text-sm font-medium leading-6 text-gray-900"
                                                >
                                                    Name
                                                </label>
                                                <div className="mt-2">
                                                    <input
                                                        id="name"
                                                        name="name"
                                                        type="text"
                                                        autoComplete="name"
                                                        value={data.name}
                                                        onChange={(e) => {
                                                            setData(
                                                                "name",
                                                                e.target.value
                                                            );
                                                        }}
                                                        required
                                                        className="block w-full rounded-md border-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    />
                                                </div>
                                            </div>

                                            <div className="sm:col-span-4">
                                                <label
                                                    htmlFor="email"
                                                    className="block text-sm font-medium leading-6 text-gray-900"
                                                >
                                                    Email
                                                </label>
                                                <div className="mt-2">
                                                    <input
                                                        id="email"
                                                        name="email"
                                                        type="email"
                                                        autoComplete="email"
                                                        value={data.email}
                                                        onChange={(e) => {
                                                            setData(
                                                                "email",
                                                                e.target.value
                                                            );
                                                        }}
                                                        required
                                                        className="block w-full rounded-md border-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    />
                                                </div>
                                            </div>

                                            <div className="sm:col-span-4">
                                                <div className="flex items-center justify-between">
                                                    <label className="block text-sm font-medium leading-6 text-gray-900">
                                                        Avatar
                                                    </label>
                                                </div>
                                                <div className="mt-2">
                                                    <label
                                                        className="relative block border-2 border-sky-700 border-dashed w-full h-9 rounded hover:border-indigo-950 hover:border-2"
                                                        htmlFor="avatar"
                                                    >
                                                        <span className="show-file-name absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 w-full text-center">
                                                            Click here to upload
                                                            file
                                                        </span>
                                                    </label>
                                                    <input
                                                        id="avatar"
                                                        name="avatar"
                                                        type="file"
                                                        autoComplete="current-avatar"
                                                        required
                                                        onChange={getName}
                                                        className="w-0 h-0 opacity-0"
                                                    />
                                                </div>
                                            </div>

                                            <div className="sm:col-span-12 min-w-48 ml-auto">
                                                <button
                                                    type="submit"
                                                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                                >
                                                    Add
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        </>
    );
};

export default addUsers;
