import classes from "./DashBoard.module.css";
import { json, useLoaderData } from "react-router-dom";
import api from "../../API";
//-------------------------------------------------------
function DashBoard() {
  let data = useLoaderData();
  if (data.error) {
    return <h1 className={classes.message}>{data.message}</h1>;
  }
  //--------------------------
  return (
    <div className={classes.container}>
      <h3>DashBoard</h3>
      <div className={classes.infor}>
        <div>
          <span>
            <p>2</p>
            <p>Clients</p>
          </span>
          <i class="fa-solid fa-user-plus"></i>
        </div>
        <div>
          <span>
            <p>10000 $</p>
            <p>Earnings of Month</p>
          </span>
          <i class="fa-solid fa-dollar-sign"></i>
        </div>
        <div>
          <span>
            <p>5</p>
            <p>Orders</p>
          </span>
          <i class="fa-solid fa-file-invoice"></i>
        </div>
      </div>
      <div className={classes.history}>
        <h3>History</h3>
        <table cellSpacing={0}>
          <thead>
            <tr>
              <th>ID USER</th>
              <th>NAME</th>
              <th>PHONE</th>
              <th>ADDRESS</th>
              <th>TOTAL</th>
              <th>STATUS</th>
              <th>DETAIL</th>
            </tr>
          </thead>
          <tbody>
            {data.map((cur, i) => (
              <tr>
                <td>{cur.user_id}</td>
                <td>{cur.name}</td>
                <td>{cur.phoneNumber}</td>
                <td>{cur.address}</td>
                <td>{cur.total} $</td>
                <td>{cur.status}</td>
                <td>
                  <button className={classes.view}>Detail</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DashBoard;
export async function loader() {
  const response = await fetch(api.getAllOrder, {
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
