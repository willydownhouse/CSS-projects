const express = require("express");
const axios = require("axios");
const { createClient } = require("redis");
const morgan = require("morgan");

const app = express();

app.use(morgan("dev"));

const redis = createClient();

redis
  .connect()
  .then(() => console.log("redis connection ok"))
  .catch(() => console.log("there was error connecting to redis"));

app.get("/payments", async (req, res) => {
  try {
    const payments = await redis.get("payments");

    if (payments === null) {
      console.log("cache miss!");
      const { data } = await axios.get(
        "https://random-data-api.com/api/stripe/random_stripe?size=4"
      );

      redis.set("payments", JSON.stringify(data));

      return res.json(data);
    }

    console.log("cache hit");

    res.send(JSON.parse(payments));
  } catch (err) {
    console.log(err);
  }
});

module.exports = app;
///
