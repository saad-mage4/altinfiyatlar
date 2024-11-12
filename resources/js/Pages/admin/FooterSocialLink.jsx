import React, { useState, useEffect } from "react";
import AdminLayout from "@/Layouts/admin/AdminLayout";
import PrimaryButton from "@/Components/PrimaryButton";
import Modal from "@/Components/Modal";
import SocialLinkForm from "@/Components/Admin/Footer/SocialLinks/SocialLinkForm";
import DeleteConfirmationModal from "@/Components/Admin/Footer/SocialLinks/DeleteConfirmationModal";
import SocialLinkTable from "@/Components/Admin/Footer/SocialLinks/SocialLinkTable";
import { useForm } from "@inertiajs/react";
import axios from "axios";
// import IconPicker from "react-icons-picker";

const FooterSocialLink = ({ auth, footersociallink }) => {
    const [products, setProducts] = useState([]);
    const [modal, setModal] = useState(false);
    const [visible, setVisible] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [editModal, setEditModal] = useState(false);
    const [selectedLink, setSelectedLink] = useState(null);
    const [value, setValue] = useState("");

    useEffect(() => {
        if (footersociallink) {
            setProducts(footersociallink);
        }
    }, [footersociallink]);

    const { put, delete: destroy, post, setData } = useForm();

    const handleVisibility = (id) => {
        setDeleteId(id);
        setVisible(true);
    };

    const handleDelete = async () => {
        if (deleteId !== null) {
            try {
                await destroy(route("social-link.destroy", deleteId), {
                    onSuccess: () => {
                        setProducts(
                            products.filter(
                                (product) => product.id !== deleteId
                            )
                        );
                        setVisible(false);
                        console.log("Social link deleted successfully");
                    },
                    onError: (errors) => {
                        console.error("Error deleting social link:", errors);
                    },
                });
            } catch (error) {
                console.error("Error deleting social link:", error);
            }
        }
        // setVisible(false);
    };

    const openEditModal = (link) => {
        setSelectedLink(link);
        setData({ icon: link.icon, link: link.link });
        setEditModal(true);
    };

    const closeModals = () => {
        setModal(false);
        setEditModal(false);
    };

    // const postMutation = useApiMutation(
    //     "post",
    //     (id) => `/social-link-update/${id}`,
    //     {
    //         invalidateKey: ["social-link-update"],
    //         onSuccess: (data) => {
    //             alert(`Update Successful: ${data}`);
    //         },
    //     }
    // );

    const onRowEditComplete = async (e) => {
        let _products = [...products];
        let { newData, index } = e;
        _products[index] = newData;
        setProducts(_products);
        const formData = new FormData();
        for (let key in newData) {
            formData.append(key, newData[key]);
        }

        try {
            // await post(route("social-link-update", newData?.id), formData, {
            //     preserveScroll: true,
            //     onSuccess: () => {
            //         console.log("Row updated successfully");
            //     },
            //     onError: (errors) => {
            //         console.error("Error updating row:", errors);
            //     },
            // });
            const response = await axios.post(
                `social-link-update/${newData?.id}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            // return response?.data;
            // const formData = { ...newData, id: newData?.id };

            // await postMutation.mutateAsync(formData);
        } catch (error) {
            console.log(error?.message);
        }
    };

    return (
        <AdminLayout auth={auth} header="Social Link" title="Social Link |">
            <Modal show={modal} onClose={() => setModal(false)}>
                <SocialLinkForm modal={modal} setModal={setModal} />
            </Modal>

            {/* Edit Modal */}
            {/* <Modal show={editModal} onClose={closeModals}>
                <EditSocialForm
                    selectedLink={selectedLink}
                    modal={editModal}
                    setModal={setEditModal}
                />
            </Modal> */}

            <Modal show={visible} onClose={() => setVisible(false)}>
                <DeleteConfirmationModal
                    visible={visible}
                    setVisible={setVisible}
                    handleDelete={handleDelete}
                />
            </Modal>

            <header className="relative">
                <h2 className="text-lg font-medium text-gray-900">
                    List Social Link
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    List of all Social Links.
                </p>
                {/* <IconPicker
                    value={value}
                    onChange={(v) => setValue(v)}
                    size={24}
                    color="#000"
                /> */}
                <PrimaryButton
                    onClick={() => setModal(true)}
                    className="absolute top-2/4 right-0 -translate-y-2/4"
                >
                    Create Social Link
                </PrimaryButton>
            </header>

            <section className="mt-6 overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-black ring-opacity-5">
                <div className="min-w-full divide-y divide-gray-300">
                    <div className="overflow-x-auto">
                        <SocialLinkTable
                            products={products}
                            setProducts={setProducts}
                            openEditModal={openEditModal}
                            handleVisibility={handleVisibility}
                            onRowEditComplete={onRowEditComplete}
                        />
                    </div>
                </div>
            </section>
        </AdminLayout>
    );
};

export default FooterSocialLink;
