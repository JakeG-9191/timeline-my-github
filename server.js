const express = require("express");
const app = express();
const path = require("path")

app.use(express.json({ extended: false }));

app.use("/api/github", require("./routes/API/github"))

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server started on ${PORT}`))