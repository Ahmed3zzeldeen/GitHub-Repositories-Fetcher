// Main Variables
let theInput = document.querySelector(".get-repos input");
let getButton = document.querySelector(".get-button");
let reposData = document.querySelector(".show-data");

getButton.onclick = function () {
    getRepos();
};

function getRepos() {
    if (theInput.value == "") {
        // If Value Is Empty
        reposData.innerHTML = "<span>Plz Write GitHub Username</span>";
    } else {
        // fetching
        fetch(`http://api.github.com/users/${theInput.value}/repos`)
        .then((response) =>  response.json())
        .then((repos) => { 
            // Empty The Container
            reposData.innerHTML = "";
            // Loop & Create repos
            repos.forEach(repo => {
                const newRepo = document.createElement('a');
                newRepo.classList.add('repo-cont');
                newRepo.href = `https://github.com/${theInput.value}/${repo.name}`
                newRepo.setAttribute('target' , '_blank')
                newRepo.innerHTML = `
                    <h2>${repo.name}</h2>
                    <p class="repo-description">${(repo.description != null) ? repo.description : ""}</p>
                    <span class="repo-data">
                        <span class="repo-stars"><i class="fa-solid fa-star"></i> ${repo.stargazers_count}</span>
                        <span class="repo-forks"><i class="fa-solid fa-code-fork"></i> ${repo.forks_count}</span>
                    </span>
                    <div class="repo-img">
                        <img src="https://opengraph.githubassets.com/Ahmed3zzeldeen/" alt="">
                    </div>
                    `;
                reposData.appendChild(newRepo);
            });
        });
    }
}
