const User = require("../models/user");

async function authorizeUser(username, password, done) {
  try {
    const user = await User.findOne({ username });

    if (!user || user.password !== password) {
      return done(null, false);
    }

    return done(null, user);
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  authorizeUser,
};
