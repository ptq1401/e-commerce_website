const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, { cors: { origin: "*" } });
// require("dotenv").config();

//-----require router-------
const userRouter = require("./routes/user");
const productRouter = require("./routes/product");
const orderRouter = require("./routes/order");
const sessionRouter = require("./routes/session");
//save message into database
const saveMessage = require("./controller/session").saveMessage;
//-----server----------
const corsOptions = {
  origin: true,
  credentials: true,
};
const fileStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "data/images");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: fileStorage });

app.use("/data/images", express.static("data/images"));
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(upload.array("files", 5));

app.use((req, res, next) => {
  const arrayDomain = ["http://localhost:3000", "http://localhost:3001"];
  const origin = req.headers.origin;
  if (arrayDomain.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  next();
});

//chat with socket IO
io.on("connection", (socket) => {
  console.log("user connect");
  socket.on("send-message", (data) => {
    saveMessage(data);
    socket.broadcast.emit(`recieve-message-${data.roomNumber}`, data.data);
  });
});

//----router---
app.use(userRouter);
app.use(productRouter);
app.use(orderRouter);
app.use(sessionRouter);

//-------------------------
mongoose
  .connect(
    "mongodb+srv://moonnie:nYNadjCW2W9ZWiiC@assiment.z4ayje8.mongodb.net/asm3?retryWrites=true&w=majority&appName=assiment"
  )
  .then((result) => {
    // app.listen(process.env.PORT || 5000);
    server.listen(5000);
  })
  .catch((err) => {
    console.log(err);
  });
