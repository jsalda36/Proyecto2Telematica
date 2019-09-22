const express = require("express");
const {mongoose} = require("./src/models/database");
const bodyParser = require("body-parser");
const app = express();
const passport = require("passport");
const users = require("./src/routes/api/users");
const topics = require("./src/routes/api/topics");
const comments = require("./src/routes/api/comments");

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
}); 

app.use(bodyParser.json());

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./src/config/passport")(passport);

// Routes
app.use("/api/users", users);
app.use("/api/topics", topics);
app.use("/api/comments", comments);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server up and running on port ${port} !`));

process.on('SIGINT', function() {
  console.log( "\nGracefully shutting down from SIGINT (Ctrl-C)" );
  // some other closing procedures go here
  process.exit(1);
});