require("dotenv").config();
const express = require("express");
const router = express.Router();
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const Database = require("./config/DB");


const login_con = require('./app/controller/login')
const signup_con = require('./app/controller/signup')

Database.connection;

const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.options("*", cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const Landing = require('./app/routes/user');


app.use("/api",Landing);
//routes 

app.listen(PORT, function (err) {
  console.log("Server listening on PORT", PORT);
});
module.exports = app;
