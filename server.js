const express = require("express");
const app = express();
const path = require("path");
const config = require("config")
const request = require("request");

app.use(express.json({ extended: false }));

app.get("/timeline", function (req, res) {
    res.sendFile(path.join(__dirname, "./client/index.html"))
});

app.get("/api/github/:username", (req, res) => {
    try {
        const options = {
            uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${config.get("githubClientId")}&client_secret=${config.get("githubSecret")}`,
            method: "GET",
            headers: { "user-agent": "node.js" }
        };

        request(options, (error, response, body) => {
            if (error) console.error(error);
            if (response.statusCode !== 200) {
                return res.status(404).json({ msg: "No Github Profile found with this username" });
            }
            res.json(JSON.parse(body));
        })
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error")
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server started on ${PORT}`))