const btnEl = document.getElementById("btn");
const jokeEL = document.getElementById("joke");

const apiKey = "j0ZbcTnuuZHJCIVSzkqGcQ==eRx7cIFS5S8Bb56j";

const options = {
    method: "GET",
    headers: {
        "X-Api-key": apiKey,
    },
}

const apiURL = "https://api.api-ninjas.com/v1/dadjokes?limit=";

async function getJoke() {

    try {
        jokeEL.innerText = "Updating...";
        btnEl.disabled = true;
        btnEl.innerText = "Loading..."
        const response = await fetch(apiURL, options);
        const data = await response.json();
    
        btnEl.disabled = false;
        btnEl.innerText = "Tell me a joke again!"
    
        jokeEL.innerText = data[0].joke;        
    } catch (error) {
        jokeEL.innerText = "An error happened, try again!";
        btnEl.disabled = false;
        btnEl.innerText = "Tell me a joke again!"
        console.log(error);
    }


}

btnEl.addEventListener("click", getJoke)