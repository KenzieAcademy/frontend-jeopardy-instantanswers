function jeopardyGrid(numberOfCols, numberOfRows, parentElement) {
    Grid.call(this, numberOfRows, numberOfCols, parentElement)
    this.random_Categories_array = []
    fetch("http://jservice.io/api/categories?count=100")
        .then(responseObject => responseObject.json())
        .then(categories => {
            console.log(categories)
            //console.log(this.categories_ID_array)
            // output.querySelector("h1").textContent = `${categories[0].question}`
            // ans.dataset.characterId = `${categories[0].answer}`.toLowerCase()
            // questionValue = `${categories[0].value}`
            this.board_create()
            this.chooseRandomCategories(categories)
            this.addCategoriesToBoard(categories)

        })
}

jeopardyGrid.prototype = Object.create(Grid.prototype)
jeopardyGrid.prototype.constructor = jeopardyGrid

jeopardyGrid.prototype.board_create = function () {
    this.board = new Array(this.numberOfCols).fill().map(() => new Array(this.numberOfRows).fill());
    this.board.forEach((col, colIndex) => {
        this.board[colIndex] = []
        const colElement = this.create_col()
        col.forEach((_, rowIndex) => {
            this.board[colIndex][rowIndex] = new BasicSquare(colIndex, rowIndex, colElement, this);
        })
    })
    // this.board[rowIndex][colIndex] = new Player(rowIndex,colIndex, rowElement, this);
    // this.board[rowIndex][colIndex].addEventListener("click",this.handleClick)

}

jeopardyGrid.prototype.chooseRandomCategories = function (categories) {
    for (let j = 0; j < this.numberOfCols; j++) {
        randomNum = Math.floor(Math.random() * categories.length);
        this.random_Categories_array.push(categories[randomNum])
    }
    console.log(this.random_Categories_array)

}

jeopardyGrid.prototype.addCategoriesToBoard = function (categories) {
    for (let m = 0; m < this.random_Categories_array.length; m++) {
        let categoryTitle = this.random_Categories_array[m].title
        //console.log(categoryTitle)
        console.log(this.board[0][m])
        this.board[m][0].element.textContent = categoryTitle
    }
}