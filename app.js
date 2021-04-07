const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/user");
const messageRoutes = require("./routes/message");
const cors = require('cors');
const helmet = require('helmet');
const xss = require('xss-clean');


const app = express();

app.use(helmet());
app.use(cors({origin:["https://sc-groupomania.netlify.app", "http://localhost:3001", "https://sc-groupomania-backend.herokuapp.com", "https://groupomania-backend.stephane-chimy.com", "https://groupomania.stephane-chimy.com"], credentials: true}));
//app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(xss());
// Prevent DOS attacks
app.use(express.json({ limit: '10kb' })); // Body limit is 10kb




app.use("/api/auth", userRoutes);
app.use("/api/messages", messageRoutes);
//app.use("/images", express.static(path.join(__dirname, "images")));
// app.use("/api/sauces", saucesRoutes);

module.exports = app;
