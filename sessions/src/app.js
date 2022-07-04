const express = require("express");

const path = require("path");
const sessions = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const MongoStore = require("connect-mongo");
const LocalStrategy = require("passport-local").Strategy;
const { dbString } = require("./config");
const authRouter = require("./router/authRouter");
const authController = require("./controllers/authController");
const User = require("./models/user");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const oneDay = 1000 * 60 * 60 * 24;

const sessionStore = MongoStore.create({
  mongoUrl: dbString,
  collectionName: "session",
});

//CREATES SESSION, SECRET -> .ENV

app.use(
  sessions({
    name: "sessionID",
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized: true,
    store: sessionStore,
    cookie: { maxAge: oneDay },
    resave: false,
  })
);

app.use(passport.initialize());
// init passport on every route call
app.use(passport.session());
// allow passport to use "express-session"

passport.use(new LocalStrategy(authController.authorizeUser));

/* All the serializeUser() function does is,
receives the "authenticated user" object from the "Strategy" framework, and attach the authenticated user to "req.session.passport.user.{..}" */
passport.serializeUser((userObj, done) => {
  console.log("serializeUser:", userObj);
  done(null, userObj);
});

// puts user to req.user
passport.deserializeUser((userObj, done) => {
  console.log("deserializeUser:", userObj);
  done(null, userObj);
});

// cookie parser middleware
app.use(cookieParser());

app.use((req, res, next) => {
  console.log("REQ:");
  console.log(req.session);
  console.log("SessionID:", req.sessionID);
  console.log("PASSPORT");
  console.log(req.session.passport);

  console.log("IS AUTHENTICATED");
  console.log(req.isAuthenticated());

  next();
});

// VIEWS
app.get("/", (req, res) => {
  res.sendFile("public/html/index.html", { root: __dirname });
});
app.get("/home", (req, res) => {
  console.log("HOME PAGE, is authenticated:", req.isAuthenticated());
  if (req.isAuthenticated()) {
    return res.sendFile("public/html/home.html", { root: __dirname });
  }

  return res.redirect("/");
});
app.get("/fail", (req, res) => {
  res.sendFile("public/html/fail.html", { root: __dirname });
});

//AUTHENTICATION ROUTES
app.use("/api/auth", authRouter);

app.get("/user", (req, res) => {
  if (!req.user) res.send("no logged in user");
  res.send(JSON.stringify(req.user));
});

app.all("*", (req, res) => {
  res.status(404).send("unknown endpoint");
});

module.exports = app;
