$("#submit").on("click", function (e) {
    e.preventDefault();
    hideForm();
    grabGithubRepo();
});

$("#search-again").on("click", function (e){
    e.preventDefault();
    newSearch();
    $("#map-location").empty();
});

introSearch = () => {
    let introSearch = $("#search-again");
    introSearch.hide();
}

hideForm = () => {
    let formHide = $("#form");
    let buttonHide = $("#submit");
    let buttonShow = $("#search-again");
    formHide.hide();
    buttonHide.hide();
    buttonShow.show();
};

newSearch = () => {
    let formShow = $("#form");
    let buttonShow = $("#submit");
    let buttonHide = $("#search-again");
    formShow.show();
    buttonShow.show();
    buttonHide.hide();
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
        console.log(repos.length)

        let extraDiv = $("<div>");
        let mapDiv = $("<div>");
        mapDiv.addClass("mapDiv");
        for (let i = 0; i < repos.length; i++) {
            if (repos[i].private === false) {
                let repoName = repos[i].name;
                let repoLink = repos[i].html_url;
                let repoSars = repos[i].stargazers_count;
                let repoWatch = repos[i].watchers_count;
                let repoCreate = (moment(repos[i].created_at, "YYYY-MM-DD h:mm:ss").format("dddd, MMMM Do, h:mma"));
                let repoDesc = repos[i].description || "No Description Given";

            let allRepoInfo = `<div class="all-repos"><h3><a target="_blank" href=${repoLink}>${repoName}</a></h3><hr><p>Current Stars: ${repoSars}</p><p>Current Watchers: ${repoWatch}</p><p>Created On ${repoCreate}</p><p>Description: ${repoDesc}</p></div>`

                mapDiv.append(allRepoInfo)
            }
        };
        extraDiv.append(mapDiv);
        $("#map-location").append(extraDiv)
    })
};

introSearch();