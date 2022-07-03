const app = require("./app");
const mongoose = require("mongoose");
const { dbString } = require("./config");

const PORT = 3001;

console.log("before store on index");

mongoose
  .createConnection(dbString)
  .asPromise()
  .then(() => console.log("db connected"))
  .catch((err) => {
    console.log(`error connecting db`, err);
  });

app.listen(PORT, () => console.log(`App listening port ${PORT}`));
