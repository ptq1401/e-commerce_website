import classes from "./LiveChat.module.css";
import { useState, useRef, useEffect } from "react";
import { json, useLoaderData } from "react-router-dom";
import api from "../../API";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

//------------------------------------------
function LiveChat() {
  socket.connect();
  const dataLoad = useLoaderData();
  const [roomMessage, setRoomMessage] = useState([]);
  const [roomNumber, setRoomNumber] = useState(0);
  const message = useRef();

  //--------chat with socket------------
  //send message
  const postMessageHandle = () => {
    const data = { msg: message.current.value, user: false };
    socket.emit("send-message", { data, roomNumber });
    setRoomMessage((prev) => prev.concat([data]));
    message.current.value = "";
  };
  //revieve message
  useEffect(() => {
    socket.on(`recieve-message-${roomNumber}`, (data) =>
      setRoomMessage((prev) => prev.concat([data]))
    );
  }, [socket, roomNumber]);

  //load message with client
  const loadMessage = (roomNumber) => {
    const chatRoom = dataLoad.filter((cur) => cur.RoomNumber === roomNumber);
    setRoomNumber(roomNumber);
    setRoomMessage(chatRoom[0].message);
  };
  //----------------------------------------------------
  return (
    <div className={classes.container}>
      <div>
        {dataLoad.length === 0 ? (
          <h3>No Request</h3>
        ) : (
          dataLoad.map((cur, i) => (
            <button
              className={classes.user}
              onClick={() => loadMessage(cur.RoomNumber)}
              key={i}
            >
              <h4>Room Number: {cur.RoomNumber}</h4>
              <p>Room ID: {cur._id}</p>
            </button>
          ))
        )}
      </div>
      <div className={classes.chatBox}>
        <div>
          {dataLoad.length === 0 ? (
            <h3>No Message</h3>
          ) : (
            roomMessage.map((cur, i) => (
              <p
                className={classes[`${cur.user ? "customer" : "admin"}`]}
                key={i}
              >
                {cur.msg}
              </p>
            ))
          )}
        </div>
        <div className={classes["box-bottom"]}>
          <input type="text" placeholder="Enter Message!" ref={message}></input>
          <button className={classes.enter} onClick={postMessageHandle}>
            <i class="fas fa-paper-plane" style={{ color: "#37aee1" }}></i>
          </button>
        </div>
      </div>
    </div>
  );
}

//------------------------------------------
export default LiveChat;
export async function loader() {
  const response = await fetch(api.getRoomChat, {
    method: "GET",
  });
  if (!response.ok) {
    throw json(
      { message: "Can not fecth API" },
      {
        status: 550,
      }
    );
  }
  const data = await response.json();
  return data;
}
