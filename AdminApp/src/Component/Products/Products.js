import classes from "./Products.module.css";
import { json, useLoaderData, useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import axios from "axios";
import api from "../../API";
//------------------------------------------
function Products() {
  const navigate = useNavigate();
  let dataLoader = useLoaderData();
  const [data, setData] = useState(dataLoader);
  const search = useRef();
  if (data.error) {
    return <h1 className={classes.message}>{data.message}</h1>;
  }
  //---search---
  const searchHandle = () => {
    const key = search.current.value;
    if (!key) return setData(dataLoader);
    const newList = dataLoader.filter((cur) =>
      cur.name.toLowerCase().includes(key)
    );
    if (newList.length === 0) return alert("No Results");
    setData(newList);
  };
  //------------------------------------------------
  const deleteHandle = (id) => {
    if (!window.confirm("Do you want to delete this product?")) return;
    axios
      .post(
        api.deleteProduct,
        { _id: id },
        {
          withCredentials: true,
        }
      )
      .then((result) => result.data)
      .then((data) => {
        if (!data.error) {
          alert("Delete product Successfully");
          window.location.reload();
        } else alert("Some Error, Can't delete Product!");
      });
  };
  return (
    <div className={classes.container}>
      <h3>Products</h3>
      <div className={classes.search}>
        <input placeholder="Enter Search" ref={search}></input>
        <button onClick={searchHandle}>Search</button>
        <table cellSpacing={0}>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>IMAGE</th>
              <th>CATEGORY</th>
              <th>EDIT</th>
            </tr>
          </thead>
          <tbody>
            {data.map((cur, i) => (
              <tr>
                <td>{cur._id}</td>
                <td>{cur.name}</td>
                <td>{cur.price} $</td>
                <td>
                  <img src={cur.img4} className={classes.img}></img>
                </td>
                <td>{cur.category}</td>
                <td>
                  <button
                    className={classes.delete}
                    onClick={() => deleteHandle(cur._id)}
                  >
                    Delete
                  </button>
                  <button
                    className={classes.update}
                    onClick={() => navigate(`/products/${cur._id}`)}
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

//------------------------------------------
export default Products;
export async function loader() {
  const response = await fetch(api.getProductAdmin, {
    method: "GET",
    credentials: "include",
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
  return data;
}
