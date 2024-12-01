"use strict";

const mongoose = require("mongoose");
const Document = mongoose.model("Entrie");

exports.get = async (search, page = 1, limit = process.env.LIMIT) => {
  let query = {};

  if (search) {
    query = {
      $or: [{ word: { $regex: `^${search}`, $options: "i" } }],
    };
  }

  let queries = [
    Document.find(query)
      .skip(parseInt((page - 1) * limit))
      .limit(parseInt(limit))
      .sort({ flight_number: -1 }),
    Document.countDocuments(query),
  ];
  let queriesResult = await Promise.all(queries);

  let res = {};
  res["result"] = queriesResult[0].map((el) => el.word);
  res["totalDocs"] = queriesResult[1];
  res["totalPages"] = Math.ceil(queriesResult[1] / limit);

  return res;
};

exports.findBy = async (page, by, findOne, filter, populate) => {
  var res;

  const limit = Math.max(1, process.env.LIMIT);
  const pagination = {
    skip: (Math.max(1, page) - 1) * limit,
    limit: limit,
  };

  if (findOne) {
    if (populate) {
      res = await Document.findOne(by, filter, pagination).populate(populate);
    } else {
      res = await Document.findOne(by, filter, pagination);
    }
    return res;
  }
  if (populate) {
    res = await Document.find(by, filter, pagination).populate(populate);
    return res;
  }

  res = await Document.find(by, filter, pagination);
  return res;
};

exports.create = async (data) => {
  var document = new Document(data);
  const res = await document.save();
  return res;
};

exports.createMany = async (data) => {
  const res = await Document.insertMany(data);
  return res;
};

exports.update = async (id, data) => {
  await Document.findByIdAndUpdate(id, {
    $set: data,
  });
};

exports.delete = async (id) => {
  await Document.findByIdAndDelete(id);
};
