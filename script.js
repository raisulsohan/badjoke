const btnEl = document.getElementById("btn");
const jokeEl = document.getElementById("joke");
const prevJokeButtonEl = document.getElementById("prevJoke");
const prevJokeListEl = document.getElementById("prevJokeList");

const apiKey = "j0ZbcTnuuZHJCIVSzkqGcQ==eRx7cIFS5S8Bb56j";

const options = {
    method: "GET",
    headers: {
        "X-Api-key": apiKey,
    },
}

const apiURL = "https://api.api-ninjas.com/v1/dadjokes?limit=";
let currentJoke = "";
let previousJokes = [];

async function getJoke() {
    try {
        jokeEl.innerText = "Updating...";
        btnEl.disabled = true;
        btnEl.innerText = "Loading..."
        const response = await fetch(apiURL, options);
        const data = await response.json();
        btnEl.disabled = false;
        btnEl.innerText = "Tell me a joke again!"
        previousJokes.unshift(currentJoke);
        currentJoke = data[0].joke;
        jokeEl.innerText = currentJoke;
    } catch (error) {
        jokeEl.innerText = "An error happened, try again!";
        btnEl.disabled = false;
        btnEl.innerText = "Tell me a joke again!"
        console.log(error);
    }
}

function showPreviousJokes() {
    // Display up to the last 10 previous jokes as a list if there are any
    const recentPreviousJokes = previousJokes.slice(0, 10);

    if (recentPreviousJokes.length > 0) {
        prevJokeListEl.innerHTML = "";
        recentPreviousJokes.forEach((joke, index) => {
            if (joke.trim() !== "") { // Check if the joke is not empty or only whitespace
                const listItem = document.createElement("li");
                listItem.innerText = `Previous Joke ${index + 1}: ${joke}`;
                prevJokeListEl.appendChild(listItem);
            }
        });
    } else {
        prevJokeListEl.innerHTML = "No previous jokes available.";
    }
}

btnEl.addEventListener("click", getJoke);
prevJokeButtonEl.addEventListener("click", showPreviousJokes);
