const express = require("express");
const router = express.Router();
const sessionController = require("../controller/session");

router.get("/get-detail-chat", sessionController.getChat);
router.get("/get-room-chat", sessionController.getAllChat);
module.exports = router;
