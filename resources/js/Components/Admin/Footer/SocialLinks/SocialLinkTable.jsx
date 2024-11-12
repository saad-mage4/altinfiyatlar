import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import Image from "@/Components/UI/Image";
import IconPicker from "@/Components/UI/IconPicker";

const SocialLinkTable = ({
    products,
    setProducts,
    onRowEditComplete,
    handleVisibility,
    openEditModal,
}) => {
    const article_status = ["active", "deactivate"];

    const BannerTemplate = (banner) => {
        return (
            <div className="flex gap-2 align-items-center">
                <Image
                    value={`../${banner?.icon}`}
                    alt={banner.id}
                    width={40}
                />
            </div>
        );
    };

    const textEditor = (options) => {
        return (
            <InputText
                type="text"
                value={options?.value}
                onChange={(e) => options.editorCallback(e.target.value)}
            />
        );
    };

    const iconEditor = (options) => {
        if (!options) return null;
        return (
            <IconPicker
                value={options?.value || ""}
                onChange={(icon) => options.editorCallback(icon)}
                placeholder="Select an icon"
            />
        );
    };

    const imgEditor = (options) => {
        return (
            <input
                type="file"
                onChange={(e) => options.editorCallback(e.target.files[0])}
            />
        );
    };

    const statusEditor = (options) => {
        return (
            <Dropdown
                value={options.value}
                options={article_status}
                onChange={(e) => options.editorCallback(e.value)}
                placeholder="Select a Status"
            />
        );
    };

    const allowEdit = (rowData) => {
        return rowData?.id;
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
                onClick={() => handleVisibility(rowData?.id)}
                // onClick={() => {
                //     setSelectedLink(rowData);
                //     setDeleteModal(true);
                // }}
                className="p-button-danger p-button-sm"
            />
        </div>
    );

    return (
        <DataTable
            lazy
            editMode="row"
            stripedRows
            paginator
            rows={4}
            scrollable
            scrollHeight="450px"
            value={products}
            tableStyle={{ minWidth: "50rem" }}
            onRowEditComplete={onRowEditComplete}
        >
            <Column
                field="id"
                header="ID"
                body={(rowData, props) => props.rowIndex + 1}
            ></Column>
            <Column
                field="link"
                header="Link"
                editor={(options) => textEditor(options)}
            ></Column>
            {/* <Column
                field="icon"
                header="Icon"
                body={BannerTemplate}
                editor={(options) => imgEditor(options)}
            ></Column> */}
            <Column
                field="icon"
                header="Icon"
                editor={(options) => iconEditor(options)}
            ></Column>
            <Column
                header="Edit"
                rowEditor={allowEdit}
                headerStyle={{ width: "10%", minWidth: "8rem" }}
                bodyStyle={{ textAlign: "center" }}
            ></Column>
            <Column
                header="Delete"
                headerStyle={{ width: "10%", minWidth: "8rem" }}
                bodyStyle={{ textAlign: "center" }}
                body={(rowData) => (
                    <Button
                        icon="pi pi-trash"
                        onClick={() => handleVisibility(rowData?.id)}
                        style={{ fontSize: "2.5rem" }}
                        className="p-button-danger p-button-sm"
                    />
                )}
            ></Column>
            {/* <Column
                body={actionsTemplate}
                header="Action"
                headerStyle={{ width: "10%", minWidth: "8rem" }}
                bodyStyle={{ textAlign: "center" }}
            /> */}
        </DataTable>
    );
};

export default SocialLinkTable;
