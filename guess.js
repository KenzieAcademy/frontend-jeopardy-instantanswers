const guessResponse = document.getElementById("guessResponse");
const guessResponseText = guessResponse.querySelector("p");
const pointsEarned = document.getElementById("pointsEarned");
let pointTally = 0
document.getElementById("guessButton").onclick = function () {
    let usersGuess = document.getElementById("input").value.toLowerCase();
    if (usersGuess === "") {
        guessResponseText.textContent = `Choose a question first!`
    } else if (usersGuess === currentQuestionAnswer.toString().toLowerCase()) {

        guessResponseText.textContent = `Nicely Done! You earned ` +
            (cellClickedCoordinates * 100) + ` points`;
        pointTally = pointTally + (cellClickedCoordinates * 100)
        pointsEarned.textContent = pointTally
        correctAnswer()
        beenClicked = false
    } else {
        guessResponseText.textContent = `Guess again!`
    }
}

function correctAnswer() {
    let correctAnswerDiv = document.getElementsByClassName("chosenQuestion")
    console.log(correctAnswerDiv[0])
    console.log(correctAnswerDiv[0].classList)
    correctAnswerDiv[0].classList.add("completedQuestion")
}