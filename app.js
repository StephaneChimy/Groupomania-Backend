const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/user");
const messageRoutes = require("./routes/message");
//const cors = require('cors');
const helmet = require('helmet');
const xss = require('xss-clean');


const app = express();

app.use(helmet());
//app.use(cors({origin:["https://sc-groupomania.netlify.app", "http://localhost:3001"] credentials: true}));
// Add CORS in the headers
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "https://sc-groupomania.netlify.app");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.header("Access-Control-Allow-Credentials", true);
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(xss());
// Prevent DOS attacks
app.use(express.json({ limit: '10kb' })); // Body limit is 10kb




app.use("/api/auth", userRoutes);
app.use("/api/messages", messageRoutes);
//app.use("/images", express.static(path.join(__dirname, "images")));
// app.use("/api/sauces", saucesRoutes);

module.exports = app;
