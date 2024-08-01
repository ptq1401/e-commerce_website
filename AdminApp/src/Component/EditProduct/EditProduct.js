import classes from "./EditProduct.module.css";
import { useRef, useState } from "react";
import { useNavigate, useLoaderData, json } from "react-router-dom";
import api from "../../API";
import axios from "axios";
//--------------------------------------------------------
function EditProduct() {
  const navigate = useNavigate();
  const data = useLoaderData();
  //--------
  const form = useRef();
  const [error, setError] = useState({
    error: false,
    message: "",
  });

  const updateProductHandle = (e) => {
    e.preventDefault();
    const formData = new FormData(form.current);
    const dataUpdate = new FormData();
    dataUpdate.append("name", formData.get("name"));
    dataUpdate.append("category", formData.get("category"));
    dataUpdate.append("long_desc", formData.get("long_desc"));
    dataUpdate.append("short_desc", formData.get("short_desc"));
    dataUpdate.append("quantity", formData.get("quantity"));
    dataUpdate.append("price", formData.get("price"));
    dataUpdate.append("_id", data._id);

    axios
      .post(api.updateProduct, dataUpdate, {
        withCredentials: true,
      })
      .then((result) => result.data)
      .then((data) => {
        if (data.error) {
          setError(data);
        } else {
          alert("Update product Successfully");
          navigate("/products");
        }
      });
  };
  return (
    <div className={classes.container}>
      {error.error && <h3>{error.message}</h3>}
      <form ref={form}>
        <div>
          <div>
            <label>Product Name</label>
            <input
              name="name"
              type="string"
              placeholder="Enter Product Name"
              defaultValue={data.name}
            ></input>
          </div>
          <div>
            <label>Category</label>
            <input
              name="category"
              type="string"
              placeholder="Enter Categori of Product"
              defaultValue={data.category}
            ></input>
          </div>
          <div>
            <label>Quantity</label>
            <input
              name="quantity"
              type="number"
              defaultValue={data.quantity}
            ></input>
          </div>
          <div>
            <label>Price</label>
            <input
              name="price"
              type="number"
              placeholder="Enter Price"
              defaultValue={data.price}
            ></input>
          </div>
        </div>
        <div>
          <div>
            <label>Short Description</label>
            <textarea
              placeholder="Enter Description"
              name="short_desc"
              type="text"
              className={classes.short}
              defaultValue={data.short_desc}
            ></textarea>
          </div>
          <div>
            <label>Long Description</label>
            <textarea
              name="long_desc"
              type="text"
              placeholder="Enter Description"
              defaultValue={data.long_desc}
            ></textarea>
          </div>
          <button
            type="submit"
            className={classes.button}
            onClick={(event) => updateProductHandle(event)}
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
}
//--------------------------------------------------------
export default EditProduct;

export async function loader({ params }) {
  const response = await fetch(api.getDetail, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ _id: params.productID }),
  });
  if (!response.ok) {
    throw json(
      { message: "Can not fecth detail event" },
      {
        status: 550,
      }
    );
  }

  const data = await response.json();
  return data.detailProduct;
}
