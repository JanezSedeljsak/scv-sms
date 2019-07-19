const express = require("express");
const bodyParser = require("body-parser");
const getRoutes = require("./routes/get.js");
const cors = require('cors');
const morgan = require('morgan');

const app = express();
app.use(morgan('combined'))
app.use(cors())

const {
    Student,
    School,
    SClass,
    Year,
    Teacher,
    Competition,
    CompetitionSubject,
    ClassCompetition,
    Subject,
    Grade,
    Achivment,
    AchivmentStudent,
    AchivmentType,
    AchivmentLevel,
    ClassStudentYear,
    ClassSubject,
    CompetitionStudent
} = require('./models/schemas');

const mongodb_conn_module = require('./mongodbConnModule');
var db = mongodb_conn_module.connect();

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
