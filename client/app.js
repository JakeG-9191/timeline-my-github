$("#submit").on("click", function (e) {
    e.preventDefault();
    hideForm();
    grabGithubRepo();
});

$("#seach-again").on("click", function (e){
    e.preventDefault();
    newSearch();
    $("#map-location").empty();
})

hideForm = () => {
    let formHide = $("#form");
    let buttonHide = $("#submit");
    formHide.hide();
    buttonHide.hide();
};

newSearch = () => {
    let formShow = $("#form");
    let buttonShow = $("#submit");
    formShow.show();
    buttonShow.show();
}

grabGithubRepo = () => {
    let username = $("#githubusername").val().trim();
    let client_id = config.client_id;
    let client_secret = config.client_secret;
    
    let gitHubURL = `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${client_id}&client_secret=${client_secret}`

    $.ajax({
        url: gitHubURL,
        method: "GET",
    }).then(function (res) {
        let repos = res
        console.log(repos)

        let extraDiv = $("<div>");
        let mapDiv = $("<div>");
        mapDiv.addClass("mapDiv");
        for (let i = 0; i < repos.length; i++) {
            if (repos[i].private === false) {
                let repoName = repos[i].name;
                let repoSars = repos[i].stargazers_count;
                let repoWatch = repos[i].watchers_count;
                let repoCreate = (moment(repos[i].created_at, "YYYY-MM-DD h:mm:ss").format("dddd, MMMM Do, h:mma"));
                let repoDesc = repos[i].description;

                let allRepoInfo = `<h3>Repo Title: ${repoName}</h3><hr><p>Current Stars: ${repoSars}</p><p>Current Watchers: ${repoWatch}</p><p>Created On ${repoCreate}</p><p>Description: ${repoDesc}</p>`

                mapDiv.append(allRepoInfo)
            }
        };
        extraDiv.append(mapDiv);
        $("#map-location").append(extraDiv)
    })
};