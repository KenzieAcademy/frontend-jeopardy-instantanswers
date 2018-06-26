const JeopardyQuestionGrid = function (config, titleGrid) {
    JeopardyGrid.call(this, config)
    this.titleGrid = titleGrid

}

JeopardyQuestionGrid.prototype = Object.create(JeopardyGrid.prototype)
JeopardyQuestionGrid.prototype.constructor = JeopardyQuestionGrid

JeopardyQuestionGrid.prototype.createColumn = function () {
    for (let colIndex in this.cellArray) {
        const colElement = document.createElement("div")
        colElement.classList.add("column")

        this.parentElement.appendChild(colElement)
        this.createCell(colIndex, colElement)
    }
}

JeopardyQuestionGrid.prototype.createCell = function (colIndex, colElement) {
    console.log("createCell", this.cellArray[colIndex])
    for (let cellIndex in this.cellArray[colIndex]) {
        const cell = new Cell(colIndex, cellIndex, this.cellWidth, this.cellHeight, this.defaultCellStyleClasses)
        this.cellArray[colIndex][cellIndex] = cell
        colElement.appendChild(cell.element)

        this.categoryPromises[colIndex]
            .then(category => {
                this.categories.push(category)
                const clue = category.clues[cellIndex]
                const paragraphElement = document.createElement('p')
                paragraphElement.classList.add('question')
                paragraphElement.dataset.clueQuestion = clue.question
                paragraphElement.textContent = "$" + clue.value
                cell.element.appendChild(paragraphElement)
            })
    }
}

// handle the events. This needs to be passed to an event listener to work
JeopardyQuestionGrid.prototype.handleEvent = function ( event ) {
    // Is the click target unclicked?
    if ( event.type === 'click' && event.target.classList[1] === 'unclicked' ) {
        // if so =>
        // Get the question data from the clueQuestion var on dataset of the <p> tag
        const q = event.target.firstChild.dataset.clueQuestion

        // Set <p> text to question
        event.target.firstChild.textContent = q

        // remove the 'unclicked' class
        event.target.classList.remove( 'unclicked' )
    }
}

// Add the event listener to the board. This needs to be called in init.js
JeopardyQuestionGrid.prototype.setupEvents = function () {
    this.parentElement.addEventListener( 'click', this.handleEvent )
}
