const Session = require("../model/session");

exports.getChat = (req, res, next) => {
  if (!req.cookies.user_id) return res.send([]);
  Session.findOne({ user_id: req.cookies.user_id }).then((data) => {
    if (!data) {
      //create new chat if data = null
      const session = new Session({
        user_id: req.cookies.user_id,
        message: [],
      });
      return session.save().then((data) => res.send(data));
    }
    return res.send(data);
  });
};

exports.getAllChat = (req, res, next) => {
  Session.find().then((data) => {
    return res.send(data);
  });
};

exports.saveMessage = (data) => {
  const RoomNumber = data.roomNumber;
  const message = data.data;
  Session.findOne({ RoomNumber: RoomNumber })
    .then((result) => {
      result.message.push(message);
      return result.save();
    })
    .catch((error) => {
      console.log(error);
    });
};
