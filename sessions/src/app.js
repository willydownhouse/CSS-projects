const express = require("express");
const path = require("path");
const sessions = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const MongoStore = require("connect-mongo");
const LocalStrategy = require("passport-local").Strategy;
const { dbString } = require("./config");
const authRouter = require("./router/authRouter");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const oneDay = 1000 * 60 * 60 * 24;

const sessionStore = MongoStore.create({
  mongoUrl: dbString,
  collectionName: "session",
});

//CREATES SESSION, SECRET -> .ENV

console.log("before express session on app");
app.use(
  sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized: true,
    store: sessionStore,
    cookie: { maxAge: oneDay },
    resave: false,
  })
);

///////

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(authUser));

function authUser(user, password, done) {
  const authenticated_user = {
    name: "keke",
    pass: "test1234",
  };
  console.log("AUTH USER");
  console.log("user", user);
  console.log("password", password);

  if (user === "keke" && password === "test1234") {
    return done(null, authenticated_user);
  }

  return done(null, false);
}

passport.serializeUser((userObj, done) => {
  console.log("serializeUser:", userObj);
  done(null, userObj);
});

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

app.all("*", (req, res) => {
  res.status(404).send("unknown endpoint");
});

module.exports = app;
