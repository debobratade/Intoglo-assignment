const express = require("express");
const mongoose = require("mongoose");
const route = require("./src/routes");
const multer = require("multer");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(multer().any());

app.use("/", route);

mongoose
  .connect(
    "mongodb+srv://portfolio:Abc1234@cluster0.i4zs5y5.mongodb.net/Intoglo_assignment?retryWrites=true&w=majority",
    { useNewUrlParser: true }
  )

  .then(() => console.log("MongoDb is connected..."))
  .catch((err) => console.log(err));

app.listen(process.env.PORT || 5000, function () {
  console.log("App running on port " + (process.env.PORT || 5000));
});
