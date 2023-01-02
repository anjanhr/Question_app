const express = require("express");
const app = express();
require("dotenv").config();
const port = 3090;
const router = require("./config/routes");
const configureDb = require("./config/database");
const cors = require("cors");

configureDb();

app.use(cors());
app.use(express.json());
app.use(router);

app.listen(port, () => {
  console.log(`Server is listening in port: ${port}`);
});
