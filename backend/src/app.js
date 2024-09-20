const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const AuthRouter = require('./routes/auth.route.js');
const dashboardRouter = require('./routes/dashboard.route.js')

const app = express()

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"))
app.use(cors())
app.use(cookieParser()); 

app.use('/auth', AuthRouter);
app.use('/dashboard', dashboardRouter)

module.exports = {app}