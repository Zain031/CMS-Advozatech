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
                fetch(`${process.env.API_URL}/category-templates/${id}`)
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
        document.getElementById("my_modal_4")?.close();
        document.getElementById("my_modal_3")?.close();
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
            fetch(`${process.env.API_URL}/category-templates/${edit?.id}`, {
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
                    // window.location.reload();
                });       
        } catch (error) {
            closeModal();
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error,
            });
        }
    };

    useEffect(() => {
        try {
            async function fetchData() {
            fetch(`${process.env.API_URL}/category-templates`)
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
                            onSubmit={(e) => {
                                e.preventDefault();
                                async function fetchData() {
                                    const submitData = new FormData(e.target);
                                    fetch(`${process.env.API_URL}/category-templates`, {
                                        method: "POST",
                                        body: submitData,
                                    })
                                        .then((res) => res.json())
                                        .then((data) => {
                                            Swal.fire({
                                                icon: "success",
                                                title: "Success",
                                                text: "Category Created Successfully",
                                            });
                                            closeModal();
                                        });
                                }
                                fetchData()
                            }}
                            className="w-full flex flex-col items-center"
                        >
                            <button onClick={(e)=>{
                                e.preventDefault()
                                closeModal()}} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                                ✕
                            </button>
                            <input
                                type="text"
                                placeholder="Name"
                                name="name"
                                className="input input-bordered input-primary w-full max-w-xs my-2"
                            />
                            <button className="btn btn-primary text-white w-full my-3">
                                Submit
                            </button>
                        </form>
                    </div>
                </dialog>

                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Category</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {category?.map((item, index) => (
                            <>
                            <tr>
                            <th>{index+1}</th>
                            <td>{item?.name}</td>

                            <td className="flex gap-3">
                                <button
                                    className=" flex gap-2 bg-success px-3 py-2 rounded-lg text-white tooltip tooltip-primary"
                                    data-tip="Edit"
                                    onClick={()=>EditModal(item?.id)}
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
                                            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                                        />
                                    </svg>
                                </button>

                                <dialog id="my_modal_3" className="modal">
                                    <div className="modal-box w-96 max-w-2xl flex flex-col justify-center items-center">
                                        <h3 className="font-bold text-lg">
                                            Edit Category
                                        </h3>
                                        <form
                                            method="dialog"
                                            className="w-full flex flex-col items-center"
                                            onSubmit={editForm}
                                        >
                                            {/* if there is a button in form, it will close the modal */}
                                            <button onClick={(e)=>{
                                                e.preventDefault();
                                                closeModal()}} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                                                ✕
                                            </button>
                                            <input
                                                type="text"
                                                placeholder="name"
                                                defaultValue={edit?.name}
                                                className="input input-bordered input-primary w-full max-w-xs my-2"
                                            />
                                        </form>
                                    </div>
                                </dialog>
                                <button
                                    className="flex gap-2 bg-error px-3 py-2 rounded-lg text-white tooltip  tooltip-primary"
                                    onClick={()=>deleteModal(item?.id)}
                                    data-tip="Delete"
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
                                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                        />
                                    </svg>
                                </button>
                            </td>
                        </tr>
                    </>
                ))}
                        
                    </tbody>
                </table>
            </div>
        </Container>
    );
};

export default Category;
