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
        btnEl.innerText = "Tell me a joke again!";

        if (currentJoke.trim() !== "") {
            previousJokes.unshift(currentJoke);
        }

        currentJoke = data[0].joke;
        jokeEl.innerText = currentJoke;

        if (previousJokes.length > 0) {
            previousJokesAvailable = true;
        }
    } catch (error) {
        jokeEl.innerText = "An error happened, try again!";
        btnEl.disabled = false;
        btnEl.innerText = "Tell me a joke again!";
        console.log(error);
    }
}

function createReviewButtons() {
    const reviewDiv = document.createElement("div");
    reviewDiv.style.position = "relative";

    const feedbackMessage = document.createElement("div");
    feedbackMessage.classList.add("feedback-message");
    const feedbackText = document.createElement("span");
    feedbackMessage.appendChild(feedbackText);

    const dislikeFeedbackDiv = document.createElement("div");
    dislikeFeedbackDiv.classList.add("dislike-feedback");
    dislikeFeedbackDiv.style.display = "none";

    const textareaContainer = document.createElement("div");
    textareaContainer.classList.add("textarea-container");

    const dislikeFeedbackText = document.createElement("textarea");
    dislikeFeedbackText.placeholder = "Please write us why you didn't like it.";
    textareaContainer.appendChild(dislikeFeedbackText);

    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("button-container");

    const submitButton = document.createElement("button");
    submitButton.innerText = "Submit";
    submitButton.classList.add("submit-feedback-btn");
    buttonContainer.appendChild(submitButton); 

    const warningMessage = document.createElement("div");
    warningMessage.classList.add("warning-message");
    warningMessage.style.display = "none";
    warningMessage.innerText = "Please write something before submitting your feedback.";
    buttonContainer.appendChild(warningMessage); 

    submitButton.addEventListener("click", () => {
        if (dislikeFeedbackText.value.trim() === "") {
            warningMessage.style.display = "block"; 
            return;
        }
        warningMessage.style.display = "none"; 
        feedbackText.innerText = "Thank you, we will look into it and improve!";
        dislikeFeedbackDiv.style.display = "none";
        setTimeout(() => { feedbackMessage.style.display = "none"; }, 3000);
    });

    dislikeFeedbackDiv.appendChild(textareaContainer);
    dislikeFeedbackDiv.appendChild(buttonContainer);

    const showFeedback = (message, isDislike = false) => {
        feedbackText.innerText = message;
        feedbackMessage.style.display = "block";
        feedbackMessage.style.opacity = "1";

        if (!isDislike) {
            setTimeout(() => {
                feedbackMessage.style.opacity = "0";
                setTimeout(() => { 
                    feedbackMessage.style.display = "none"; 
                }, 300);
            }, 3000);
        }

        if (!isDislike) {
            dislikeFeedbackDiv.style.display = "none";
        }
    };

    const likeButton = document.createElement("button");
    likeButton.innerText = "Like";
    likeButton.classList.add("review-btn", "like-btn");
    likeButton.addEventListener("click", () => showFeedback("You liked the joke!"));

    const dislikeButton = document.createElement("button");
    dislikeButton.innerText = "Dislike";
    dislikeButton.classList.add("review-btn", "dislike-btn");
    dislikeButton.addEventListener("click", () => {
        showFeedback("You disliked the joke!", true);
        dislikeFeedbackDiv.style.display = "block";
    });

    reviewDiv.appendChild(likeButton);
    reviewDiv.appendChild(dislikeButton);
    reviewDiv.appendChild(feedbackMessage);
    reviewDiv.appendChild(dislikeFeedbackDiv);

    return reviewDiv;
}

let previousJokesAvailable = false;

function showPreviousJokes() {
    const recentPreviousJokes = previousJokes.slice(0, 10);

    if (recentPreviousJokes.length > 0 || previousJokesAvailable) {
        prevJokeListEl.innerHTML = "";
        recentPreviousJokes.forEach((joke, index) => {
            if (joke.trim() !== "") {
                const listItem = document.createElement("li");
                listItem.innerText = `Previous Joke ${index + 1}: ${joke}`;
                const reviewButtons = createReviewButtons();
                listItem.appendChild(reviewButtons);
                prevJokeListEl.appendChild(listItem);
            }
        });
        previousJokesAvailable = true;
    } else {
        prevJokeListEl.innerHTML = '<div id="noPreviousJokesMessage">No previous jokes available.</div>';
        const noPreviousJokesMessage = document.getElementById("noPreviousJokesMessage");
        if (noPreviousJokesMessage) {
            noPreviousJokesMessage.style.opacity = "1";
            setTimeout(() => {
                noPreviousJokesMessage.style.opacity = "0";
                setTimeout(() => {
                    if (noPreviousJokesMessage.parentNode) {
                        noPreviousJokesMessage.parentNode.removeChild(noPreviousJokesMessage);
                    }
                }, 500);
            }, 1000);
        }
    }
}

btnEl.addEventListener("click", getJoke);
prevJokeButtonEl.addEventListener("click", showPreviousJokes);
