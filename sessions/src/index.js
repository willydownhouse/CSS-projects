const app = require("./app");
const mongoose = require("mongoose");
const { dbString } = require("./config");

const PORT = 3001;

// tällä ei mitään tekemistä session storen db yhteyteen, tämä on täysin erillinen yhteys
mongoose
  .connect(dbString)
  .then(() => console.log("db connected"))
  .catch((err) => console.log(`error conneting to db`, err));

app.listen(PORT, () => console.log(`App listening port ${PORT}`));
