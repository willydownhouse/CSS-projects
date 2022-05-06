const express = require("express");
const ejs = require("ejs");
const path = require("path");

const app = express();

const PORT = 3001;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  console.log(req.params);
  res.render("home.ejs", { input: "" });
});

app.get("/order", (req, res) => {
  console.log(req.path);
  console.log(req.body);
  console.log(req.params);
  console.log(req.query);

  const { action } = req.query;

  res.render("home.ejs", { input: action });
  // this bypasses template engine and xss attack works
  //res.send(`<div>${action}</div>`);
});

app.use("*", (req, res) => {
  res.render("error.ejs");
});

app.listen(PORT, () => {
  console.log(`Listening port ${PORT}`);
});
