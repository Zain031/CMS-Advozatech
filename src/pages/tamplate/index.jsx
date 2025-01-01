import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import Container from "../../components/container";
import Headers from "../../layouts/partials/header";

const Tamplate = () => {
  const [data, setData] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);
  const [category, setCategory] = useState([]);
  const [category_id, setCategory_id] = useState(null);
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const modal = () => {
    document.getElementById("my_modal_3").showModal();
  };

  const deleteData = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${process.env.API_URL}/templates/${id}`, {
          method: "DELETE",
        })
          // .then((res) => res.json())
          .then((res2) => {
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
            setData((prevData) => prevData.filter((item) => item.id !== id));
          })
          .catch((error) => {
            console.error("Error deleting data:", error);
            Swal.fire(
              "Error!",
              "There was an error deleting the data.",
              "error"
            );
          });
      }
    });
  };

  const addModal = () => {
    document.getElementById("my_modal_4").showModal();
  };

  const closeModal = () => {
    setCategory_id(null);
    setPreviewImage(null);
    document.getElementById("my_modal_3")?.close();
    document.getElementById("my_modal_4")?.close();
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(process.env.API_URL + "/templates").then(
          (res) => res.json()
        );
        const categoryResponse = await fetch(process.env.API_URL + "/category-templates").then(
          (res) => res.json()
        );
        if (!categoryResponse) {
          console.log("No Data Category");
        }
        if (!response) {
          console.log("No Data");
        }
        setData(response["data"]);
        console.log(
          response["data"].forEach((item) => console.log(item["image"]))
        );
      } catch (error) {
        console.log(error);
      }
      try {
        const response = await fetch(process.env.API_URL + "/category-templates").then(
          (res) => res.json()
        );
        if (!response) {
          console.log("No Data");
        }
        setCategory(response["data"]);
        console.log(response["data"]);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Container>
        <Headers title="Template" />
        <div className="overflow-x-auto">
          <div className="flex justify-end  mb-4 gap-6 px-10 ">
            <input
              type="text"
              placeholder="Search By Name"
              className="input input-bordered input-primary w-full max-w-xs my-3"
            />

            <select className="select select-primary w-full max-w-xs my-3">
              <option disabled selected>
                Category
              </option>
              <option>Company Profile</option>
              <option>Website Custom</option>
              <option>Mobile Application</option>
              <option>UI/UX</option>
            </select>

            <button
              className=" px-3 rounded-md bg-success text-white  max-w-xs my-3"
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
              <h3 className="font-bold text-lg">Create Tamplate</h3>

              <form
                method="dialog"
                onSubmit={(e) => {
                  e.preventDefault();
                  async function sendData() {
                    try {
                      const formData = new FormData();
                      formData.append("title", e.target.title.value);
                      formData.append("price", e.target.price.value);
                      formData.append("link", e.target.link.value);
                      formData.append("image", e.target.image.files[0]);
                      formData.append("category_id", e.target.category_id.value);
                      await fetch(process.env.API_URL + `/templates`, {
                        method: "POST",
                        body: formData,
                      })
                        .then((res) => res.json())
                        .then((data) => {
                          console.log(data);
                        });
                      console.log("Data Submitted");
                    } catch (error) {
                      console.log(error);
                    }
                  }
                  sendData();
                }}
                className="w-full flex flex-col items-center"
              >
                {/* if there is a button in form, it will close the modal */}
                <button
                  onClick={(e)=>{
                    e.preventDefault()
                    closeModal()}}
                  className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                >
                  ✕
                </button>
                <input
                  type="text"
                  placeholder="Title"
                  name="title"
                  className="input input-bordered input-primary w-full max-w-xs my-2"
                />
                <input
                  type="number"
                  placeholder="Price"
                  name="price"
                  className="input input-bordered input-primary w-full max-w-xs my-2"
                />
                <input
                    type="text"
                    name='link'
                    placeholder="Link Address"
                    className="input input-bordered input-primary w-full max-w-xs my-3"
                />
                {/* <input
                                    type="text"
                                    placeholder="Quantity Purchased"
                                    className="input input-bordered input-primary w-full max-w-xs my-3"
                                /> */}
                <select name="category_id" className="select select-primary w-full max-w-xs my-3">
                {category.map((item,index) => (
                                                <option selected={item.id} key={index} value={item.id}>{item.name}</option>
                                            ))}
                </select>
                <div className="image-upload-container">
                  <h2 className="text-lg font-semibold">Select Image</h2>
                  <div className="current-image my-4">
                    {previewImage && (
                      <div className="image-preview my-4">
                        <h3 className="text-md font-medium">Uploaded Image</h3>
                        <img
                          src={previewImage}
                          className="w-20 h-20 object-cover rounded-md border border-gray-300"
                          alt="Preview"
                        />
                      </div>
                    )}
                  </div>
                  <input
                    type="file"
                    name="image"
                    className="file-input file-input-bordered file-input-primary w-full max-w-xs my-3"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </div>
                <button type="submit" className="btn btn-primary mt-4">
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
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Link Address</th>
                {/* <th>Quantity Purchased</th> */}
                <th>Category</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 &&
                data.map((item, index) => (
                  <>
                    <tr>
                      <th>{index + 1}</th>
                      <td>
                        <img src={item["image"]} className="w-20 h-20" alt="" />{" "}
                      </td>
                      <td>{item["title"]}</td>
                      <td>{item["price"]}</td>
                      <td>{item['link']}</td>
                      {/* <td>http://example.com</td> */}
                      {/* <td>60</td> */}
                      <td>Category_ID</td>
                      <td className="flex gap-3">
                        <button
                          className="btn btn-success text-white flex gap-2 tooltip tooltip-primary"
                          data-tip="Edit"
                          onClick={modal}
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

                        <button
                          className="btn btn-error text-white flex gap-2 tooltip tooltip-primary"
                          data-tip="Delete"
                          onClick={()=>deleteData(item.id)}
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
                    {/* You can open the modal using document.getElementById('ID').showModal() method */}

                    <dialog id="my_modal_3" className="modal">
                      <div className="modal-box w-96 max-w-2xl flex flex-col justify-center items-center">
                        <h3 className="font-bold text-lg">Edit Tamplate</h3>

                        <form
                          method="dialog"
                          onSubmit={(e) => {
                            e.preventDefault();
                            console.log(e.target.title.value);
                            console.log(e.target.price.value);
                            console.log(e.target.image.files[0]);
                            try {
                              const formData = new FormData();
                              formData.append("title", e.target.title.value);
                              formData.append("price", e.target.price.value);
                              formData.append("link", e.target.link.value);
                              formData.append("category_id", e.target.category_id.value);
                              formData.append("image", e.target.image.files[0]);
                              fetch(
                                process.env.API_URL + `/templates/${item.id}`,
                                {
                                  method: "PUT",
                                  body: formData,
                                }
                              )
                                .then((res) => res.json())
                                .then((data) => {
                                  console.log(data);
                                });
                              console.log("Data Submitted");
                            } catch (error) {
                              console.log(error);
                            }
                          }}
                          className="w-full flex flex-col items-center"
                        >
                          {/* if there is a button in form, it will close the modal */}
                          <button
                            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                            onClick={(e)=>{
                              e.preventDefault()
                              closeModal()}}
                          >
                            ✕
                          </button>
                          <input
                            type="text"
                            placeholder="title"
                            defaultValue={item.title}
                            name="title"
                            className="input input-bordered input-primary w-full max-w-xs my-2"
                          />
                          <input
                            type="text"
                            placeholder="price"
                            defaultValue={item.price}
                            name="price"
                            className="input input-bordered input-primary w-full max-w-xs my-2"
                          />
                          <input
                              type="text"
                              placeholder="Link Address"
                              name="link"
                              className="input input-bordered input-primary w-full max-w-xs my-3"
                          />
                          {/* <input
                                            type="text"
                                            placeholder="Quantity Purchased"
                                            className="input input-bordered input-primary w-full max-w-xs my-3"
                                        /> */}
                          <select name="category_id" className="select select-primary w-full max-w-xs my-3">
                              <option disabled selected>
                                  Category
                              </option>
                              {category.map((item,index) => (
                                  <option key={index} value={item.id}>{item.name}</option>
                              ))}
                          </select>
                          <div className="image-upload-container">
                            <h2 className="text-lg font-semibold">
                              Select Image
                            </h2>
                            <div className="current-image my-4">
                              {item?.image && !previewImage && (
                                <div className="image-preview my-4">
                                  <h3 className="text-md font-medium">
                                    Current Image
                                  </h3>
                                  <img
                                    src={item?.image}
                                    className="w-20 h-20 object-cover rounded-md border border-gray-300"
                                    alt="Preview"
                                  />
                                </div>
                              )}
                              {previewImage && (
                                <div className="image-preview my-4">
                                  <h3 className="text-md font-medium">
                                    Uploaded Image
                                  </h3>
                                  <img
                                    src={previewImage}
                                    className="w-20 h-20 object-cover rounded-md border border-gray-300"
                                    alt="Preview"
                                  />
                                </div>
                              )}
                            </div>
                            <input
                              type="file"
                              name="image"
                              className="file-input file-input-bordered file-input-primary w-full max-w-xs my-3"
                              accept="image/*"
                              onChange={handleImageChange}
                            />
                          </div>
                          <button type="submit" className="btn btn-primary mt-4">
                              Submit
                          </button>
                        </form>
                      </div>
                    </dialog>
                  </>
                ))}
            </tbody>
          </table>
        </div>
      </Container>
    </>
  );
};

export default Tamplate;
