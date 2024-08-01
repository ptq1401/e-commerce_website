import { useNavigate } from "react-router-dom";
import classes from "./Logout.module.css";
import { useContext } from "react";
import LoginContext from "../../store/LoginContext";
import api from "../../API";
//------------------------------------
function Logout() {
  const navigate = useNavigate();
  const dataContext = useContext(LoginContext);
  const logoutHandle = () => {
    fetch(api.logout, {
      method: "GET",
      credentials: "include",
    });
    dataContext.setLoginFunction(false);
    navigate("/");
  };
  return (
    <div className={classes.logout}>
      <button onClick={() => logoutHandle()}>Logout</button>
    </div>
  );
}
export default Logout;
