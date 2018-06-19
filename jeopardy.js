function JeopardyGrid(numberOfCols, numberOfRows, parentElement, enableCORSProxy = false) {
    Grid.call(this, numberOfRows, numberOfCols, parentElement)
    this.random_categories_array = []
    this.random_categories_number_arr = []
    this.values_array = []
    this.enableCORSProxy = enableCORSProxy
    this.CORSProxy = "https://cors-anywhere.herokuapp.com/"

    this.fetchFromJService("categories?count=100")
        .then(categories => {
            this.board_create()
                // find a way
                // to make sure that
                // if the category selected has less than 5 clues("questions"),
                // another category gets chosen
                .chooseRandomCategories(categories)
                .drawCategories(categories)
                .fetchQuestions(categories)
        })
}
let onBoardCategories = [];

JeopardyGrid.prototype = Object.create(Grid.prototype)
JeopardyGrid.prototype.constructor = JeopardyGrid

JeopardyGrid.prototype.board_create = function () {
    this.board = new Array(this.numberOfCols).fill().map(() => new Array(this.numberOfRows).fill());
    this.board.forEach((col, colIndex) => {
        this.board[colIndex] = []
        const colElement = this.create_col()
        col.forEach((_, rowIndex) => {
            this.board[colIndex][rowIndex] = new BasicSquare(colIndex, rowIndex, colElement, this);
        })
    })
    return this
}

JeopardyGrid.prototype.chooseRandomCategories = function (categories) {
    for (let j = 0; j < this.numberOfCols; j++) {
        const randomNum = Math.floor(Math.random() * categories.length);
        // console.log(categories[randomNum])
        this.random_categories_array.push(categories[randomNum])
        this.random_categories_number_arr.push(categories[randomNum].id)
    }
    return this
}
JeopardyGrid.prototype.drawCategories = function (categories) {
    for (let m = 0; m < this.random_categories_array.length; m++) {
        let categoryTitle = this.random_categories_array[m].title
        this.board[m][0].element.textContent = categoryTitle
        this.board[m][0].element.classList.add("category")
    }
    return this
}

JeopardyGrid.prototype.fetchQuestions = function (categories) {
    for (let catIndex = 0; catIndex < this.random_categories_array.length; catIndex++) {
        let catID = this.random_categories_array[catIndex].id
        this.fetchFromJService(`clues?category=${ catID }`)
            .then(category => {
                this.values_array.push(category)
                onBoardCategories.push(category)
                this.drawQuestions(category, catIndex)
            })

    }
    return this
}

JeopardyGrid.prototype.fetchFromJService = function (endpoint) {
    const uri = `${ this.enableCORSProxy ? this.CORSProxy : "" }http://jservice.io/api/${ endpoint }`
    return fetch(uri)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
        })
}

JeopardyGrid.prototype.drawQuestions = function (category, catIndex) {
    for (let questionIndex = 0; questionIndex < 5; questionIndex++) {
        const currentSquare = this.board[catIndex][questionIndex + 1].element
        currentSquare.textContent = ((questionIndex + 1) * 100)
        //console.log(category[questionIndex].question)
        this.eventListener(currentSquare, category)
    }
}

JeopardyGrid.prototype.eventListener = function (currentSquare, category) {
    currentSquare.addEventListener("click", this.handle_click, category)
}

let currentQuestionAnswer = []
let cellClickedCoordinates = []
let beenClicked = false
JeopardyGrid.prototype.handle_click = function (event) {
    console.log(beenClicked)
    const cellClicked = event.target
    if (beenClicked === false && !cellClicked.classList.contains("completedQuestion")) {
        currentQuestionAnswer.shift()
        cellClickedCoordinates.shift()
        cellClicked.classList.add("chosenQuestion")
        const questionTextBox = document.getElementById("questionTextBox")
        questionTextBox.textContent = onBoardCategories[cellClicked.dataset.rowIndex - 1][cellClicked.dataset.colIndex].question +
            " ||| " + onBoardCategories[cellClicked.dataset.rowIndex - 1][cellClicked.dataset.colIndex].answer
        currentQuestionAnswer.push(onBoardCategories[cellClicked.dataset.rowIndex - 1][cellClicked.dataset.colIndex].answer)
        cellClickedCoordinates.push(cellClicked.dataset.rowIndex)
        console.log(cellClickedCoordinates.toString())
        beenClicked = true
    } else {
        return
    }

    console.log(beenClicked)
}