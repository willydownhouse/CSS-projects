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
    const payments = await getOrSetCache("payments", async () => {
      const { data } = await axios.get(
        "https://random-data-api.com/api/stripe/random_stripe?size=4"
      );

      return data;
    });

    res.json(payments);
  } catch (err) {
    console.log("FROM CATCH:");
    console.log(err);
  }
});

module.exports = app;
///

function getOrSetCache(key, cb) {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await redis.get(key);

      if (data !== null) return resolve(JSON.parse(data));

      const freshData = await cb();

      redis.set(key, JSON.stringify(freshData));

      return resolve(freshData);
    } catch (err) {
      reject(err);
    }
  });
}
