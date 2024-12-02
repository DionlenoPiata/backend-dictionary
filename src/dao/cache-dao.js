"use strict";

const mongoose = require("mongoose");
const Document = mongoose.model("Cache");

exports.saveToCache = async (key, value, ttlInSeconds) => {
  const expiresAt = new Date(Date.now() + parseInt(ttlInSeconds) * 1000);

  await Document.findOneAndUpdate(
    { key },
    { value, expiresAt },
    { upsert: true, new: true }
  );
};

exports.getFromCache = async (key) => {
  const cacheEntry = await Document.findOne({ key });

  if (cacheEntry) {
    if (new Date() > cacheEntry.expiresAt) {
      await Document.deleteOne({ key });
      return null;
    }
    return cacheEntry.value;
  }
  return null;
};
