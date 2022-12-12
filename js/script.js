// Section for overview information
const overviewElement = document.querySelector(".overview")
// My username
const username = "ericgfree"
// Unordered list for repos
const displayReposElement = document.querySelector(".repo-list")



//  My profile information
const myUserInfo = async function () {
    const userInfo = await fetch(
        `https://api.github.com/users/${username}`
    );
    const data = await userInfo.json();
    console.log(data);
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
    myUserRepos();
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
    for (const repo of repos) {
    const repoItem = document.createElement("li");
    repoItem.classList.add("repo");
    repoItem.innerHTML = `<h3>${repo.name}</h3>`;
    displayReposElement.append(repoItem);
    }
};