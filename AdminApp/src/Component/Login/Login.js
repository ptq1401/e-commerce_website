import classes from "./Login.module.css";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import LoginContext from "../../store/LoginContext";
import api from "../../API";
//-------------
function Login() {
  const dataContext = useContext(LoginContext);
  const form = useRef();
  const [error, setError] = useState({ error: false, message: "" });
  const navigate = useNavigate();

  const loginHandle = (e) => {
    e.preventDefault(e);
    const formData = new FormData(form.current);
    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    fetch(api.login, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((result) => result.json())
      .then((data) => {
        if (data.error) {
          setError(data);
        } else {
          dataContext.setLoginFunction(true);
          navigate("/dashboard");
        }
      })
      .catch((err) => console.log(err));
  };
  //----------------------------------------------
  return (
    <>
      <div className={classes.modal}>
        <h3 className={classes.title}>Login to authenticate admin rights</h3>
        <form ref={form}>
          <input placeholder="Email" name="email"></input>
          <input placeholder="Password" type="password" name="password"></input>
          {error.error && <h3>{error.message}</h3>}
          <button type="submit" onClick={(e) => loginHandle(e)}>
            Login
          </button>
        </form>
      </div>
    </>
  );
}
//----------------
export default Login;
