function JeopardyGrid(numberOfCols, numberOfRows, parentElement) {
    Grid.call(this, numberOfRows, numberOfCols, parentElement)
    this.random_categories_array = []
    this.random_categories_number_arr = []
    this.values_array = []

    this.fetchFromJService("categories?count=100")
        .then(categories => {
            this.board_create()
                .chooseRandomCategories(categories)
                .drawCategories(categories)
                .fetchQuestions(categories)
        })
}

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
        randomNum = Math.floor(Math.random() * categories.length);
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
        //console.log(categoryTitle)
        //console.log(this.board[m][0])
    }
    return this
}

JeopardyGrid.prototype.fetchQuestions = function (categories) {
    for (let m = 0; m < this.random_categories_array.length; m++) {
        let categoriesIDs = this.random_categories_array[m].id
        //console.log(this.values_array)

        this.fetchFromJService(`clues?category=${categoriesIDs}`)
            .then(values => {
                this.values_array.push(values)
                //console.log(values)
                this.drawQuestions(values)
                // return
                // for( let rowNum = 1 ; rowNum < this.numOfRows ; rowNum++ ){
                //   this.grid[rowNum][currentCol].element.textContent = rowNum * 200;
                // }
                //console.log("hey", category , currentCol );         
            })

    }
    return this
}

JeopardyGrid.prototype.fetchFromJService = function (endpoint) {
    return fetch(`http://cors-anywhere.herokuapp.com/http://jservice.io/api/${endpoint}`)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
        })
}

JeopardyGrid.prototype.drawQuestions = function (values) {
    for (let v = 0; v < 5; v++) {
        //this.grid[rowNum][currentCol].element.textContent = rowNum * 200;
        //console.log(values[v])
    }
}