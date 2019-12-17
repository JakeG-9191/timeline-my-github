const express = require("express");
const app = express();
const path = require("path");
const config = require("config")
const request = require("request");

app.use(express.json({ extended: false }));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server started on ${PORT}`))