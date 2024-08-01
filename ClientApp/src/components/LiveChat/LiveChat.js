import ReactDOM from "react-dom";
import classes from "./LiveChat.module.css";
import { chatAction } from "../../store/index";
import { useSelector, useDispatch } from "react-redux";
import { useState, useRef, useEffect } from "react";
import api from "../../API";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");
//-------------------------------------------------------
const BoxMessage = () => {
  const show = useSelector((state) => state.chat.show);
  const login = useSelector((state) => state.login.login);
  const dispatch = useDispatch();
  const message = useRef();
  const [chatMessage, setChatMessage] = useState([]);
  const [roomNumber, setRoomNumber] = useState(null);
  //----
  useEffect(() => {
    fetch(api.getDetailChat, {
      method: "GET",
      credentials: "include",
    })
      .then((data) => data.json())
      .then((result) => {
        setChatMessage(result.message);
        setRoomNumber(result.RoomNumber);
      });
  }, []);

  ///---
  const postMessageHandle = () => {
    const data = { msg: message.current.value, user: true };
    socket.emit("send-message", { data, roomNumber });
    setChatMessage((prev) => prev.concat([data]));
    message.current.value = "";
  };
  useEffect(() => {
    socket.on(`recieve-message-${roomNumber}`, (data) =>
      setChatMessage((prev) => prev.concat([data]))
    );
  }, [socket, roomNumber]);
  //------
  return (
    <>
      {show && (
        <div className={classes.box}>
          <div className={classes["box-top"]}>
            <p>Customer Support</p>
            <button>Let's chat app</button>
          </div>
          <div className={classes["box-chat"]}>
            {chatMessage.map((cur, i) => (
              <p
                key={i}
                className={classes[`${cur.user ? "customer" : "admin"}`]}
              >
                {cur.msg}
              </p>
            ))}
          </div>
          <div className={classes["box-bottom"]}>
            <i class="fas fa-user-tie" style={{ color: "#3965b1" }}></i>
            <input
              type="text"
              placeholder="Enter Message!"
              ref={message}
            ></input>
            <button>
              <i class="fas fa-paperclip"></i>
            </button>
            <button>
              <i class="fas fa-smile" style={{ color: "#6e6e6e" }}></i>
            </button>
            <button onClick={postMessageHandle} className={classes.enter}>
              <i class="fas fa-paper-plane" style={{ color: "#37aee1" }}></i>
            </button>
          </div>
        </div>
      )}
      {login && (
        <button
          className={classes["button-mess"]}
          onClick={() => dispatch(chatAction.CLICK())}
        >
          <i class="fab fa-facebook-messenger"></i>
        </button>
      )}
    </>
  );
};
const LiveChat = () => {
  return ReactDOM.createPortal(
    <BoxMessage />,
    document.getElementById("livechat")
  );
};
//----------------
export default LiveChat;
