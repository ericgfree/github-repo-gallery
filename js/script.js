// Section for overview information
const overviewElement = document.querySelector(".overview");
// My username
const username = "ericgfree";
// Unordered list for repos
const repoList = document.querySelector(".repo-list");
// Repo information section
const reposSection = document.querySelector(".repos");
// Repo data section
const repoDataSection = document.querySelector(".repo-data");
// Back to repos button 
const backToRepo = document.querySelector(".view-repos");
// Dymanic search box
const filterInput = document.querySelector(".filter-repos")


//  My profile information
const myUserInfo = async function () {
    const userInfo = await fetch(
        `https://api.github.com/users/${username}`
    );
    const data = await userInfo.json();
    // console.log(data);
    showUserInfo(data);
};

myUserInfo();

const showUserInfo = function (data) {
    const div = document.createElement("div");
    div.classList.add("user-info");
    div.innerHTML = 
    `<figure>
        <img alt="user avatar" src=${data.avatar_url} />
    </figure>
    <div>
        <p><strong>Name:</strong>${data.name}</p>
        <p><strong>Bio:</strong>${data.bio}</p>
        <p><strong>Location:</strong>${data.location}</p>
        <p><strong>Number of public repos:</strong>${data.public_repos}</p>
    </div>`;
    overviewElement.append(div);
    myUserRepos(username);
};


// Fetch repos
const myUserRepos = async function () {
    const userRepos = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=10`);
    const repoData = await userRepos.json();
    // console.log(myUserRepos)
    showRepoData(repoData)
};


// Display repo information
const showRepoData = function (repos) {
    filterInput.classList.remove("hide")
    for (const repo of repos) {
    const repoItem = document.createElement("li");
    repoItem.classList.add("repo");
    repoItem.innerHTML = `<h3>${repo.name}</h3>`;
    repoList.append(repoItem);
    }
};

// Repo selection event
repoList.addEventListener("click", function (e) {
    if (e.target.matches("h3")) {
        const repoName = e.target.innerText;
        // console.log(repoList);
        getRepoInfo(repoName);
    }
});

// Grab the repo info
const getRepoInfo = async function (repoName) {
    const specificInfo = await fetch(`https://api.github.com/repos/${username}/${repoName}
    `);
    const repoInfo = await specificInfo.json();
    // console.log(repoInfo);
    const fetchLanguages = await fetch(repoInfo.languages_url);
    const languageData = fetchLanguages.json();
    // console.log(languageData);


// Languages Array
    const languages = [];
    for (const languages in languageData) {
        languages.push(languages);
        // console.log(languages);
    }
    showRepoInfo(repoInfo, languages)
};

//  Grab and display specific repo information
const showRepoInfo = function (repoInfo, languages) {
    backToRepo.classList.remove("hide");
    repoDataSection.innerHTML = "";
    repoDataSection.classList.remove("hide");
    reposSection.classList.add("hide");
    const div = document.createElement("div");
    div.innerHTML = `
        <h3>Name: ${repoInfo.name}</h3>
        <p>Description: ${repoInfo.description}</p>
        <p>Default Branch: ${repoInfo.default_branch}</p>
        <p>Languages: ${languages.join(",")}</p>
        <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on Github!</a>
        `;
    repoDataSection.append(div);
    

};

// Go back to repo list
backToRepo.addEventListener("click", function () {
    reposSection.classList.remove("hide");
    repoDataSection.classList.add("hide");
    backToRepo.classList.add("hide");
});

filterInput.addEventListener("input", function (e) {
    const searchInput = e.target.value;
    // console.log(filterInput);
    const repos = document.querySelectorAll(".repo");
    const lowCaseInput = searchInput.toLowerCase();

    for (const repo of repos) {
        const lowCaseText = repo.innerText.toLowerCase();
        if (lowCaseText.includes(searchInput)) {
            repo.classList.remove("hide")
        } else {
            repo.classList.add("hide");
        }
    }
});