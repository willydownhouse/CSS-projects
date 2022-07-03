const express = require("express");
const passport = require("passport");

const router = express.Router();

//LOGIN
router.post(
  "/login",

  passport.authenticate("local", {
    successRedirect: "/home",
    failureRedirect: "/fail",
  })
);

// LOGOUT -> DESTROY SESSION, POISTA ID REDIS
router.get("/logout", (req, res) => {
  req.session.destroy();
  //   res.cookie("sessionID", "logged out", {
  //     maxAge: 1000 * 2,
  //     httpOnly: true,
  //   });
  res.redirect("/");
});

module.exports = router;
