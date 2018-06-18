const categoryArray = [9953, 16939, 1031, 12857, 7656, 8246]

let jeopardyGrid = new Grid(6, 6, document.getElementById('jeopardygrid'))
let categoryRow = jeopardyGrid.categoryRow

const questionDestination = document.getElementById("question")
const categoryDestination = document.getElementById("category")
const pointsDestination = document.getElementById("points")
const answer = document.getElementById("answer")
let question = null
const pointTotal = document.getElementById("pointtotal")

document.getElementById("submit").addEventListener("click", checkAnswer)
document.getElementById("newquestion").addEventListener("click", initFetch)

let points = 0


function initFetch() {
    fetch("http://jservice.io/api/random/")
        .then(responseObject => responseObject.json())
        .then(hydratedBody => {
            console.log(hydratedBody[0])
            question = hydratedBody[0]
            categoryDestination.textContent = question.category.title
            questionDestination.textContent = question.question
            pointsDestination.textContent = question.value
    })
}

function checkAnswer(event) {
    console.log(answer.value, question.answer)
    if (answer.value.toLowerCase() === question.answer.toLowerCase()) {
        addScore()
        answer.value = ''
    } else {
        subtractScore()
        answer.value = ''
    }
}

function addScore() {
    points += Number(question.value)
    pointTotal.textContent = points
    return points
}

function subtractScore() {
    points -= Number(question.value)
    pointTotal.textContent = points
    return points
}

initFetch()

for(let i = 0; i < categoryArray.length; i++) {
    fetch("http://jservice.io/api/category?id=" + categoryArray[i])
        .then(res => res.json())
        .then(data => {
            console.log("data: " + data.title)
            let categoryName = categoryRow[i]
            categoryName.textContent = data.title
        })
}
console.log(categoryRow)