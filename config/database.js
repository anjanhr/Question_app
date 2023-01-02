const mongoose = require("mongoose");

const configureDb = () => {
  mongoose
    .connect("mongodb://localhost:27017/question-app")
    .then(() => {
      console.log("database is connected");
    })
    .catch(() => {
      console.log("database is not connected");
    });
};

module.exports = configureDb;
