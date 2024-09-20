const express = require("express");
require("dotenv").config();
const connectDB = require("./db/index.js");
const {app} = require("./app.js")


const PORT = process.env.PORT || 8000;

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running at : ${PORT}`);
        });
    })
    .catch((err) => {
        console.log("MONGODB connection failed !!! ", err);
    });
