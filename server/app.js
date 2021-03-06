const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const morgan = require('morgan');

const app = express();
app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("dist"));


//routing
const getRoutes = require("./routes/get.js");
app.use("/api/get", getRoutes);

const authRoutes = require("./routes/auth.js");
app.use("/api/auth", authRoutes);



app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.listen(3000);
