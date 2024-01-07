const btnEl = document.getElementById("btn");
const jokeEl = document.getElementById("joke");
const prevJokeButtonEl = document.getElementById("prevJoke");

const apiKey = "j0ZbcTnuuZHJCIVSzkqGcQ==eRx7cIFS5S8Bb56j";

const options = {
    method: "GET",
    headers: {
        "X-Api-key": apiKey,
    },
}

const apiURL = "https://api.api-ninjas.com/v1/dadjokes?limit=";
let currentJoke = "";
let previousJoke = "";

async function getJoke() {
    try {
        jokeEl.innerText = "Updating...";
        btnEl.disabled = true;
        btnEl.innerText = "Loading..."
        const response = await fetch(apiURL, options);
        const data = await response.json();
        btnEl.disabled = false;
        btnEl.innerText = "Tell me a joke again!"
        previousJoke = currentJoke;
        currentJoke = data[0].joke;
        jokeEl.innerText = currentJoke;
    } catch (error) {
        jokeEl.innerText = "An error happened, try again!";
        btnEl.disabled = false;
        btnEl.innerText = "Tell me a joke again!"
        console.log(error);
    }
}

function showPreviousJoke() {
    // Display the previous joke directly in the "joke" element
    jokeEl.innerText = "Previous Joke: " + previousJoke;
}

btnEl.addEventListener("click", getJoke);
prevJokeButtonEl.addEventListener("click", showPreviousJoke);
