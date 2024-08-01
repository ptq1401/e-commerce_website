import classes from "./AddProduct.module.css";
import { useRef, useState, useEffect } from "react";
import axios from "axios";
import api from "../../API";
//--------------------------------------------------------
function AddProduct() {
  //--------
  const [file, setFile] = useState();
  const form = useRef();
  const [error, setError] = useState({
    error: true,
    message: "Just admin can add new product, are you Admin?",
  });

  const addProductHandle = (e) => {
    e.preventDefault();
    const formData = new FormData(form.current);
    const data = new FormData();
    data.append("name", formData.get("name"));
    data.append("category", formData.get("category"));
    data.append("long_desc", formData.get("long_desc"));
    data.append("short_desc", formData.get("short_desc"));
    data.append("quantity", formData.get("quantity"));
    data.append("price", formData.get("price"));
    if (!file) return alert("Choose images to upload");
    for (let i = 0; i < file.length; i++) {
      data.append("files", file[i]);
    }

    axios
      .post(api.addProduct, data, {
        withCredentials: true,
      })
      .then((result) => result.data)
      .then((data) => {
        if (data.error) {
          setError(data);
        } else {
          alert("Add product Successfully");
          window.location.reload();
        }
      });
  };
  return (
    <div className={classes.container}>
      {error.error && <h3>{error.message}</h3>}
      <form enctype="multipart/form-data" ref={form}>
        <div>
          <div>
            <label>Product Name</label>
            <input
              name="name"
              type="string"
              placeholder="Enter Product Name"
            ></input>
          </div>
          <div>
            <label>Category</label>
            <input
              name="category"
              type="string"
              placeholder="Enter Categori of Product"
            ></input>
          </div>
          <div>
            <label>Quantity</label>
            <input name="quantity" type="number" defaultValue={0}></input>
          </div>
          <div>
            <label>Price</label>
            <input name="price" type="number" placeholder="Enter Price"></input>
          </div>
          <div>
            <label>Image (Choose 5 images of Product)</label>
            <input
              className={classes.image}
              name="image"
              type="file"
              accept=".jpg, .jpeg, .png"
              onChange={(e) => {
                const file = e.target.files;
                setFile(file);
              }}
              multiple
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
            ></textarea>
          </div>
          <div>
            <label>Long Description</label>
            <textarea
              name="long_desc"
              type="text"
              placeholder="Enter Description"
            ></textarea>
          </div>
          <button
            type="submit"
            className={classes.button}
            onClick={(event) => addProductHandle(event)}
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
}
//--------------------------------------------------------
export default AddProduct;
