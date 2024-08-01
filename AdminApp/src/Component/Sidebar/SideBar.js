import classes from "./SideBar.module.css";
import { Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useContext, useEffect } from "react";
import LoginContext from "../../store/LoginContext";
import api from "../../API";
//--------------------------------------------------------

function SideBar() {
  const dataContext = useContext(LoginContext);
  const login = dataContext.login;

  //------check login when start page-----
  useEffect(() => {
    fetch(api.checkLogin, {
      method: "GET",
      credentials: "include",
    })
      .then((data) => {
        return data.json();
      })
      .then((user) => {
        if (!user.error) dataContext.setLoginFunction(true);
      })
      .catch((err) => console.log(err));
  }, []);
  //------------------
  if (!login)
    return (
      <>
        <Outlet></Outlet>
      </>
    );
  return (
    <div className={classes.container}>
      <div className={classes.sidebar}>
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive ? classes.active : classes.link
          }
        >
          <i class="fa-brands fa-microsoft"></i> Dashboard
        </NavLink>
        <NavLink
          to="/products"
          className={({ isActive }) =>
            isActive ? classes.active : classes.link
          }
        >
          <i class="fa-solid fa-mobile-screen-button"></i> Products
        </NavLink>
        <NavLink
          to="/livechat"
          className={({ isActive }) =>
            isActive ? classes.active : classes.link
          }
        >
          <i class="fa-solid fa-comments"></i> LiveChat
        </NavLink>
        <NavLink
          to="/add-product"
          className={({ isActive }) =>
            isActive ? classes.active : classes.link
          }
        >
          <i class="fa-solid fa-plus"></i> Add Product
        </NavLink>
        {login && (
          <NavLink
            to="/logout"
            className={({ isActive }) =>
              isActive ? classes.active : classes.link
            }
          >
            <i class="fa-solid fa-right-from-bracket"></i> Logout
          </NavLink>
        )}
        {!login && (
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? classes.active : classes.link
            }
          >
            <i class="fa-solid fa-right-from-bracket"></i> Login
          </NavLink>
        )}
      </div>
      <Outlet></Outlet>
    </div>
  );
}
//--------------------------------------------------------
export default SideBar;
