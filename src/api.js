const express = require("express");
const serverless = require("serverless-http")
const cookieParser = require("cookie-parser");
const userRoutes = require("../routes/user");
const messageRoutes = require("../routes/message");
const cors = require('cors');
const helmet = require('helmet');
const xss = require('xss-clean');
// const bodyParser = require("body-parser");

const app = express();

app.use(helmet());
app.use(cors({origin:["https://sc-groupomania.netlify.app", "http://localhost:3001", "https://groupomania-backend.stephane-chimy.com/"], credentials: true}));
//app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(xss());
// Prevent DOS attacks
app.use(express.json({ limit: '10kb' })); // Body limit is 10kb




// app.use("/api/auth", userRoutes);
// app.use("/api/messages", messageRoutes);
app.use("./netlify/functions/api/auth", userRoutes);
app.use("./netlify/functions/api/messages", messageRoutes);
//app.use("/images", express.static(path.join(__dirname, "images")));
// app.use("/api/sauces", saucesRoutes);

// module.exports = app;
module.exports.handler = serverless(app);
