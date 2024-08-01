const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://moonnie:nYNadjCW2W9ZWiiC@assiment.z4ayje8.mongodb.net/asm3?retryWrites=true&w=majority&appName=assiment"
);
const Product = require("../model/product");
Product.find().then((result) => {
  result.map((cur) => {
    cur.img5 =
      "http://localhost:5000/data/images" + cur.img5.slice(-22, -1) + "g";
    return cur.save();
  });
});
