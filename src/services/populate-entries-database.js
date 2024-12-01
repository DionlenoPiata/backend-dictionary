"use strict";

const axios = require("axios");
const entrieDao = require("../dao/entrie-dao");

exports.execute = async () => {
  await populate();
};

async function populate() {
  const entries = await entrieDao.get();

  if (entries && entries.length === 0) {
    console.log(`${new Date()} - Populate database: Entries...`);
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "https://raw.githubusercontent.com/dwyl/english-words/refs/heads/master/words_dictionary.json",
    };

    try {
      const { data } = await axios.request(config);
      console.log("Starting populate entries data...");

      const keys = Object.keys(data).map((key) => key);

      const documents = keys.map((key) => ({ word: key }));
      await entrieDao.createMany(documents);

      console.log("Finishing populate entries data!");
    } catch (error) {
      console.log(error);
      populate();
    }
  }
}
