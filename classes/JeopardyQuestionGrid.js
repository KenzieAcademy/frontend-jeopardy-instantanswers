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
    }
}
