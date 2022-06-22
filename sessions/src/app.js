const express = require("express");
const path = require("path");
const session = require("express-session");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());

const options = {
  root: path.join(__dirname),
};

app.get("/", (req, res) => {
  res.sendFile("public/html/index.html", options, (err) => {
    if (err) {
      console.log(err);
    }
  });
});

const user = {
  name: "keke",
  pass: "test1234",
};

app.post("/login", (req, res) => {
  console.log(req.body);

  const { username, password } = req.body;

  if (user.name === username && user.pass === password) {
    res.sendFile("public/html/home.html", options, (err) => {
      if (err) {
        console.log(err);
      }
    });
  } else {
    res.sendFile("public/html/fail.html", options, (err) => {
      if (err) {
        console.log(err);
      }
    });
  }
});

app.all("*", (req, res) => {
  res.status(404).send("unknown endpoint");
});

module.exports = app;
