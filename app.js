const express = require("express");
const bodyParser = require("body-parser");
const session = require('express-session');

const getRoutes = require("./routes/get.js");

const app = express();

app.use(session({
    secret: 'key4Scv4pp'
}));

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

//serve the content straight from the distribution folder (output after npm run build)
app.use(express.static("dist"));

//serve out the api
app.use("/api/get", getRoutes);

app.listen(3000);
