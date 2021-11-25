const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const app = express();
const createError = require("http-errors");
const cors = require("cors");
const path = require("path");
const request = require("request");

app.use(cors());
require("dotenv").config();
// const initializePassport= require('./config/passportConfig');
// initializePassport(passport);
const port = process.env.PORT || 3000;
const route = require("./api/routes");
const { sequelize } = require("./models");
sequelize.sync();

var corsOptions = {
  origin: "http://localhost:3001",
};

global.__basedir = __dirname;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// parse request data  content type
// Enable CORS from client-side
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials"
  );
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

app.use(morgan("combined"));
// app.use(fileUpload());

new Promise((resolve, reject) => {
  reject("error");
}).catch((error) => {});

// Route init
route(app);
app.get("/", async (req, res, next) => {
  res.send("Welcome to Eplaza!");
});

app.use(express.static(path.join(__dirname, "/")));
// app.use(async(req,res,next)=>{
//   // const error= new Error("Not Found")
//   // error.status=404;
//   // next(error)
//   next(createError.NotFound());
// })
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

app.get("/city2", async (req, res, next) => {
  // let city = req.query.city;
  request(
    `api.openweathermap.org/data/2.5/forecast/daily?id=1581130&cnt=7&appid=b1b15e88fa797225412429c1c50c122a1`,
    function (error, response, body) {
      console.log(body);
      let data = JSON.parse(body);
      if (data === null) {
        res.send({
          success: false,
        });
      }
      res.status(200).json({
        success: true,
        data: data,
      }); // Print the error if one occurred
      console.log("statusCode:", response && response.statusCode); // Print the response status code if a response was received
      console.log("body:", body); // Print the HTML for the Google homepage.
    }
  );
});

app.listen(port, async () => {
  console.log(`Example app listening at http://localhost:${port}`);
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});
