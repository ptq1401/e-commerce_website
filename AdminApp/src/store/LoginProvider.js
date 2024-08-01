import LoginContext from "./LoginContext";
import { useState } from "react";
//--------------------------
const LoginProvider = (props) => {
  //----------------------------------
  const [login, setLogin] = useState(false);
  const setLoginFunction = (isLogin) => {
    setLogin(isLogin);
  };
  const value = {
    login: login,
    setLoginFunction: setLoginFunction,
  };

  //---------------------------------------
  return (
    <LoginContext.Provider value={value}>
      {props.children}
    </LoginContext.Provider>
  );
};
//------------------------------
export default LoginProvider;
