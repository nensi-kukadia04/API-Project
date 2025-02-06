const express = require("express");
const port = 9000;
const app = express();
const passport = require("passport");
const jwtPassport = require("./config/passport-jwt-statergy");
const session = require("express-session");
const mongoose = require("mongoose");

// const db=require('./config/mongoose');

mongoose.connect(
    "mongodb+srv://kukadiyanensi838:HSDmIm2lmEgtkfVa@cluster0.j60zp.mongodb.net/API").then((res) => {
        console.log("Database is Online Connected");
    })
    .catch((err) => {
        console.log("Database is not Connected",err);
    });
    
    app.use(express.urlencoded());
app.use(
  session({
    name: "jwtSession",
    secret: "jwtJJ",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 100 * 60 * 60,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/", require("./routes"));

app.listen(port, (err) => {
  err
    ? console.log("server is not connected", err)
    : console.log("server is running on port http://localhost:" + port);
});
