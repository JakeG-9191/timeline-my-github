const express = require("express");
const app = express();
const path = require("path");
const config = require("../config/default.json");
const request = require("request");

// app.use(express.json({ extended: false }));

// app.get("/", function (req, res) {
//     res.sendFile(path.join(__dirname, "./client/"))
// });

// app.get("/api/github/:username", (req, res) => {
//     try {
//         const options = {
//             uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${config.get("githubClientId")}&client_secret=${config.get("githubSecret")}`,
//             method: "GET",
//             headers: { "user-agent": "node.js" }
//         };

//         request(options, (error, response, body) => {
//             if (error) console.error(error);
//             if (response.statusCode !== 200) {
//                 return res.status(404).json({ msg: "No Github Profile found with this username" });
//             }
//             res.json(JSON.parse(body));
//         })
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send("Server Error")
//     }
// });

$("#submit").on("click", function (e) {
    e.preventDefault();

    grabGithubRepo();
})

grabGithubRepo = () => {

    let username = $("#githubusername").val().trim();
    
    let gitHubURL = `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${config.get("githubClientId")}&client_secret=${config.get("githubSecret")}`

    $.ajax({
        url: gitHubURL,
        method: "GET",
    }).then(function (res) {
        let repos = res
        console.log(repos)
    })

}