const mongoose = require("mongoose");
mongoose.set("bufferCommands", false);
const mongo_url = process.env.MONGO_CONN;

mongoose
  .connect(mongo_url)
  .then(() => {
    console.log("MongoDB Connected....");
  })
  .catch((err) => {
    console.log("MongoDB COnnection error", err);
  });
