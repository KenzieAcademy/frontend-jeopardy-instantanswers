const categoryArray = [9953, 16939, 1031, 12857, 7656, 8246]

function Grid (row, col, destination) {
    this.gridArray = new Array(row).fill().map(() => new Array(col).fill())
    this.destination = destination
    this.fillGrid()
    this.destination.addEventListener("click", this.boundClickEvent)
}

Grid.prototype.fillGrid = function () {
    let howManyTimesHaveWeLooped = 0
    for(let rowIndex = 0; rowIndex < this.gridArray.length; rowIndex++) {
        const rowDiv = document.createElement('div')
        rowDiv.classList.add('row')
        this.destination.appendChild(rowDiv)
        this.fillRow(rowIndex, rowDiv)
    }
}

Grid.prototype.fillRow = function (rowIndex, rowDiv) {
    const gridRow = this.gridArray[rowIndex];
    for(let colIndex = 0; colIndex < gridRow.length; colIndex++) {
        let cell = new Cell(rowIndex, colIndex, rowDiv, 'cell')
        gridRow[colIndex] = cell
        rowDiv.appendChild(cell.element)
    }
}

function Cell(rowIndex, colIndex, rowDiv, classList) {
    this.rowIndex = rowIndex
    this.colIndex = colIndex
    this.rowDiv = rowDiv
    this.createCell(rowIndex, colIndex, rowDiv, classList)
}


Cell.prototype.createCell = function (rowIndex, colIndex, rowDiv, classList) {
    this.element = document.createElement('div')
    this.element.className = classList
    this.element.dataset.rowIndex = rowIndex
    this.element.dataset.colIndex = colIndex
    rowDiv.appendChild(this.element)
}

Cell.prototype.constructor = Cell

let jeopardyGrid = new Grid(6, 6, document.getElementById('jeopardygrid'))

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
    event.preventDefault()
    console.log(answer.value, question.answer)
    if (answer.value.toLowerCase() === question.answer.toLowerCase()) {
        addScore()
    } else {
        subtractScore()
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
        })
}