"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    entrie: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Entrie",
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

module.exports = mongoose.model("Favorite", schema);
