const output = document.getElementById("output");
const hiddenAnswer = document.getElementById("hiddenAnswer");
const ans = hiddenAnswer.querySelector("h2");
const guessResponse = document.getElementById("guessResponse");
const guessResponseText = guessResponse.querySelector("p");
let questionValue = 0
// fetch("http://jservice.io/api/categories?count=100")
//     .then(responseObject => responseObject.json())
//     .then(hydratedBody => {
//         console.log(hydratedBody)
//         output.dataset.characterId = hydratedBody.id
//         output.querySelector("h1").textContent = `${hydratedBody[0].question}`
//         ans.dataset.characterId = `${hydratedBody[0].answer}`.toLowerCase()
//         questionValue = `${hydratedBody[0].value}`
//     })

    


// document.getElementById("guessButton").onclick = function () {
//     let usersGuess = document.getElementById("input").value.toLowerCase();
//     if (usersGuess === ans.dataset.characterId) {
//         guessResponseText.textContent = `You did it! You earned ${questionValue} points!`
//         fetch("http://jservice.io/api/random")
//             .then(responseObject => responseObject.json())
//             .then(hydratedBody => {
//                 console.log(hydratedBody)
//                 output.dataset.characterId = hydratedBody.id
//                 output.querySelector("h1").textContent = `${hydratedBody[0].question}`
//                 ans.dataset.characterId = `${hydratedBody[0].answer}`.toLowerCase()
//             })
//     } else {
//         guessResponseText.textContent = `Guess again!`
//     }
//     console.log(ans.dataset.characterId)
//     console.log(usersGuess)
// }

//provide a user input box, conver the input to all lower case,
// and then compare it to the answer