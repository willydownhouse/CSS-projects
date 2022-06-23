const express = require("express");
const path = require("path");
const sessions = require("express-session");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());

const oneDay = 1000 * 60 * 60 * 24;

app.use(
  sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false,
  })
);

// cookie parser middleware
app.use(cookieParser());

const user = {
  name: "keke",
  pass: "test1234",
};

let session;

// VIEWS
app.get("/", (req, res) => {
  res.sendFile("public/html/index.html", { root: __dirname });
});
app.get("/home", (req, res) => {
  session = req.session;
  if (session.userid) {
    res.sendFile("public/html/home.html", { root: __dirname });
  } else {
    res.redirect("/");
  }
});
app.get("/fail", (req, res) => {
  res.sendFile("public/html/fail.html", { root: __dirname });
});

//LOGIN
app.post("/login", (req, res) => {
  console.log(req.body);

  const { username, password } = req.body;

  if (user.name === username && user.pass === password) {
    session = req.session;
    session.userid = username;
    console.log("SUCCESFULL SIGN IN:");
    console.log(req.session);
    return res.status(200).send("succesfull log in");
  }

  res.status(401).send("wrong username or password");
});

// LOGOUT
app.get("/logout", (req, res) => {
  req.session.destroy();
  res.send("you logged out");
});

app.all("*", (req, res) => {
  res.status(404).send("unknown endpoint");
});

module.exports = app;
