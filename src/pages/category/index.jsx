import { useEffect, useState } from "react";
import Container from "../../components/container";
import Header from "../../layouts/partials/header";
import Swal from "sweetalert2";

const Category = () => {
    const [category,setCategory] = useState([]);
    const [edit, setEdit] = useState(false);
    const EditModal = (id) => {
        try {
            async function fetchData(id) {
                fetch(`${process.env.API_URL}category-templates/${id}`)
                    .then((res) => res.json())
                    .then((data) => setEdit(data));
            }
            fetchData(id);
            document.getElementById("my_modal_3").showModal();
        }
        catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error,
            });
        }
    };

    const addModal = () => {
        document.getElementById("my_modal_4").showModal();
    };

    const closeModal = () => {
        setEdit([])
        document.getElementById("my_modal_4").close();
        document.getElementById("my_modal_3").close();
    };

    const deleteModal = (id) => {
        try {
            async function fetchData(id) {
                fetch(`${process.env.API_URL}category-templates/${id}`, {
                    method: "DELETE",
                })
                    .then((res) => res.json())
                    .then((data) => {
                        Swal.fire({
                            icon: "success",
                            title: "Success",
                            text: "Category Deleted Successfully",
                        });
                    });
            }
            fetchData(id);
            
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error,
            });
            
        }
    };


    const editForm = (e) => {  
        e.preventDefault();
        const submitData = new FormData(e.target);
        
        try {
            fetch(`${process.env.API_URL}category-templates/${edit?.id}`, {
                method: "PUT",
                // headers: {
                //     "Content-Type": "application/json",
                // },
                body: submitData,
            })
                .then((res) => res.json())
                .then((data) => {
                    Swal.fire({
                        icon: "success",
                        title: "Success",
                        text: "Category Updated Successfully",
                    });
                    closeModal();
                });       
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error,
            });
        }
    }

    useEffect(() => {
        try {
            async function fetchData() {
            fetch(`${process.env.API_URL}category-templates`)
                .then((res) => res.json())
                .then((data) => setCategory(data['data']));
            }
            fetchData();
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error,
            });
        }
    }, []);

    return (
        <Container>
            <Header title="Categories" />

            <div className="overflow-x-auto">
                <div className="flex justify-end  mb-4 px-20">
                    <button
                        className="px-2 py-2 rounded-md bg-success text-white tooltip tooltip-primary"
                        data-tip="Create"
                        onClick={addModal}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 4.5v15m7.5-7.5h-15"
                            />
                        </svg>
                    </button>
                </div>

                <dialog id="my_modal_4" className="modal">
                    <div className="modal-box w-96 max-w-2xl flex flex-col justify-center items-center">
                        <h3 className="font-bold text-lg">Create Category</h3>

                        <form
                            method="dialog"
                            className="w-full flex flex-col items-center"
                        >
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                                ✕
                            </button>
                            <input
                                type="text"
                                placeholder="Name"
                                className="input input-bordered input-primary w-full max-w-xs my-2"
                            />
                            <button className="btn btn-primary text-white w-full my-3">
                                Submit
                            </button>
                        </form>
                    </div>
                </dialog>
            </div>
        </Container>
    );
};

export default Category;
