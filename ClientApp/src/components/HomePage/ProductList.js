import classes from "./ProductList.module.css";
import ProductItem from "./ProductItem";
import { json, useLoaderData } from "react-router-dom";
import api from "../../API";
//----------------------------
function ProductList() {
  const data = useLoaderData();
  return (
    <div className={classes.container}>
      <div className={classes.title}>
        <p>MADE THE HARD WAY</p>
        <p>TOP TRENDING PRODUCTS</p>
      </div>
      <div className={classes.productlist}>
        {data.map((cur, i) => (
          <ProductItem key={i} product={cur}></ProductItem>
        ))}
      </div>
    </div>
  );
}
//-------------------------------
export default ProductList;
export async function loader() {
  const response = await fetch(api.productTrending);
  if (!response.ok) {
    throw json(
      { message: "Can not fecth detail event" },
      {
        status: 550,
      }
    );
  }
  const data = await response.json();
  // console.log(data);
  return data;
}
