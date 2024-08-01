import { NavLink } from "react-router-dom";
import classes from "./NavBar.module.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loginAction } from "../../store/index";
import { useEffect } from "react";
//----------------pages-----------------------
function Navigation() {
  //---hooks---------
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const login = useSelector((state) => state.login.login);
  let user = useSelector((state) => state.login.currentUser);
  let name;
  if (user) {
    name = user.name;
    if (name.length >= 7) name = name.slice(0, 7);
  }

  //------check login when start page-----
  useEffect(() => {
    fetch("http://localhost:5000/check-login", {
      method: "GET",
      credentials: "include",
    })
      .then((data) => data.json())
      .then((user) => {
        if (!user.error) dispatch(loginAction.ON_LOGIN(user.user));
      })
      .catch((err) => console.log(err));
  }, []);

  ///---logout---
  const LogoutHandle = () => {
    fetch("http://localhost:5000/logout", {
      method: "GET",
      credentials: "include",
    });
    dispatch(loginAction.ON_LOGOUT());
    navigate("/login?mode=login");
  };
  //--------------
  return (
    <div className={classes.navbar}>
      <div>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? classes.active : classes.link
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/shop?mode=All"
          className={({ isActive }) =>
            isActive ? classes.active : classes.link
          }
        >
          Shop
        </NavLink>
      </div>
      <h1 className={classes.heading}>BOUTIQUE</h1>
      <div>
        {login && (
          <NavLink
            to="/history"
            className={({ isActive }) =>
              isActive ? classes.active : classes.link
            }
          >
            History
          </NavLink>
        )}
        <NavLink
          to="/cart"
          className={({ isActive }) =>
            isActive ? classes.active : classes.link
          }
        >
          <i class="fas fa-shopping-cart"></i> Cart
        </NavLink>
        <NavLink
          to="/login?mode=login"
          className={({ isActive }) =>
            isActive ? classes.active : classes.link
          }
        >
          <i className="fas fa-user"></i> {login ? name : "Login"}
        </NavLink>
        {login && (
          <button onClick={LogoutHandle} className={classes["button-logout"]}>
            (Logout)
          </button>
        )}
      </div>
    </div>
  );
}
//------------------export------------------------
export default Navigation;
