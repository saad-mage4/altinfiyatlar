import React, { useState, useEffect, useCallback } from "react";
import AdminLayout from "@/Layouts/admin/AdminLayout";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import DangerButton from "@/Components/DangerButton";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import Modal from "@/Components/Modal";

const FooterLink = ({ auth, footer_link }) => {
    const { links, column, title, columnTitle } = footer_link;
    const [socialLinks, setSocialLinks] = useState([]);
    const [modal, setModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [selectedLink, setSelectedLink] = useState(null);

    useEffect(() => {
        if (links) setSocialLinks(links);
    }, [links]);

    const {
        data,
        setData,
        post,
        put,
        delete: destroy,
        processing,
        errors,
    } = useForm({
        name: "",
        link: "",
        column,
    });

    //  For Column title update
    const {
        data: columnData,
        setData: setColumnData,
        put: columnput,
        processing: processingColumn,
        errors: errorsColumn,
    } = useForm({
        title: columnTitle || "",
    });
    const handleColUpdate = (e) => {
        e.preventDefault();
        columnput(route("update-col-title", column), {
            preserveScroll: true,
            onSuccess: () => {
                // Handle success, if needed
            },
            onError: (errors) => {
                console.error("Error updating column title:", errors);
            },
        });
    };
    const openCreateModal = useCallback(() => setModal(true), []);
    const openEditModal = (link) => {
        setSelectedLink(link);
        setData({ name: link.title, link: link.link });
        setEditModal(true);
    };
    const closeModals = () => {
        setModal(false);
        setEditModal(false);
        setDeleteModal(false);
    };

    const handleCreateSubmit = (e) => {
        e.preventDefault();
        post(route("footer-link.store"), {
            preserveScroll: true,
            onSuccess: () => setModal(false),
        });
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        put(route("footer-link.update", selectedLink?.id), {
            onSuccess: () => setEditModal(false),
        });
    };

    const handleDelete = () => {
        destroy(route("footer-link.destroy", selectedLink?.id), {
            onSuccess: () => setDeleteModal(false),
        });
    };

    const actionsTemplate = (rowData) => (
        <div className="flex space-x-2">
            <Button
                icon="pi pi-pencil"
                onClick={() => openEditModal(rowData)}
                className="p-button-success p-button-sm"
            />
            <Button
                icon="pi pi-trash"
                onClick={() => {
                    setSelectedLink(rowData);
                    setDeleteModal(true);
                }}
                className="p-button-danger p-button-sm"
            />
        </div>
    );

    return (
        <AdminLayout auth={auth} header={title} title={`${title} |`}>
            {/* Update Column Title Form */}
            <div className="mb-4">
                <form onSubmit={handleColUpdate}>
                    <div className="mb-4">
                        <InputLabel htmlFor="title" value="Column Title" />
                        <TextInput
                            id="title"
                            name="title"
                            value={columnData?.title || title}
                            onChange={(e) =>
                                setColumnData("title", e.target.value)
                            }
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
                        <PrimaryButton
                            type="submit"
                            disabled={processingColumn}
                        >
                            {processingColumn ? "Updating..." : "Update"}
                        </PrimaryButton>
                    </div>
                </form>
            </div>
            {/* <ColumnTitle
                title={columnTitle}
                handleColUpdate={handleColUpdate}
            /> */}
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-semibold">{title ?? "dw"}</h1>
                <PrimaryButton onClick={openCreateModal}>
                    {/* <i className="pi pi-plus"></i> */}
                    Add New Link
                </PrimaryButton>
            </div>

            <DataTable
                lazy
                stripedRows
                rows={4}
                scrollable
                scrollHeight="450px"
                tableStyle={{ minWidth: "50rem" }}
                value={socialLinks}
                paginator
                className="p-datatable-sm"
            >
                <Column
                    field="id"
                    header="SN"
                    body={(rowData, props) => props.rowIndex + 1}
                />
                <Column field="title" header="Name" />
                <Column field="link" header="Link" />
                <Column
                    body={actionsTemplate}
                    header="Action"
                    headerStyle={{ width: "10%", minWidth: "8rem" }}
                    bodyStyle={{ textAlign: "center" }}
                />
            </DataTable>

            {/* Create Modal */}
            <Modal show={modal} onClose={closeModals}>
                <form onSubmit={handleCreateSubmit} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        Create Link
                    </h2>
                    <div className="mt-4">
                        <InputLabel htmlFor="name" value="Link Name" />
                        <TextInput
                            id="name"
                            name="name"
                            // value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            className="mt-1 block w-full"
                        />
                        {errors.name && (
                            <div className="text-red-600 mt-2">
                                {errors.name}
                            </div>
                        )}
                    </div>
                    <div className="mt-4">
                        <InputLabel htmlFor="link" value="Link" />
                        <TextInput
                            id="link"
                            name="link"
                            // value={data.link}
                            onChange={(e) => setData("link", e.target.value)}
                            className="mt-1 block w-full"
                        />
                        {errors.link && (
                            <div className="text-red-600 mt-2">
                                {errors.link}
                            </div>
                        )}
                    </div>
                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModals}>
                            Close
                        </SecondaryButton>
                        <PrimaryButton
                            type="submit"
                            className="ml-2"
                            disabled={processing}
                        >
                            {processing ? "Saving..." : "Save"}
                        </PrimaryButton>
                    </div>
                </form>
            </Modal>

            {/* Edit Modal */}
            <Modal show={editModal} onClose={closeModals}>
                <form onSubmit={handleEditSubmit} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        Edit Link
                    </h2>
                    <div className="mt-4">
                        <InputLabel htmlFor="name" value="Link Name" />
                        <TextInput
                            id="name"
                            name="name"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            className="mt-1 block w-full"
                        />
                        {errors.name && (
                            <div className="text-red-600 mt-2">
                                {errors.name}
                            </div>
                        )}
                    </div>
                    <div className="mt-4">
                        <InputLabel htmlFor="link" value="Link" />
                        <TextInput
                            id="link"
                            name="link"
                            value={data.link}
                            onChange={(e) => setData("link", e.target.value)}
                            className="mt-1 block w-full"
                        />
                        {errors.link && (
                            <div className="text-red-600 mt-2">
                                {errors.link}
                            </div>
                        )}
                    </div>
                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModals}>
                            Close
                        </SecondaryButton>
                        <PrimaryButton
                            type="submit"
                            className="ml-2"
                            disabled={processing}
                        >
                            {processing ? "Updating..." : "Update"}
                        </PrimaryButton>
                    </div>
                </form>
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal show={deleteModal} onClose={closeModals}>
                <div className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        Confirm Delete
                    </h2>
                    <p className="mt-2">
                        Are you sure you want to delete this link?
                    </p>
                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModals}>
                            No
                        </SecondaryButton>
                        <DangerButton onClick={handleDelete} className="ml-2">
                            Yes
                        </DangerButton>
                    </div>
                </div>
            </Modal>
        </AdminLayout>
    );
};

export default FooterLink;
