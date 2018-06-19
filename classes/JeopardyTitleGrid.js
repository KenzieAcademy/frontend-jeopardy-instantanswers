const JeopardyTitleGrid = function (config) {
    this.categoryTitles = []

    JeopardyGrid.call(this, config)
}

JeopardyTitleGrid.prototype = Object.create(JeopardyGrid.prototype)
JeopardyTitleGrid.prototype.constructor = JeopardyTitleGrid

JeopardyTitleGrid.prototype.createCell = function (colIndex, colElement) {
    for (let cellIndex in this.cellArray[colIndex]) {
        const cell = new Cell(colIndex, cellIndex, this.cellWidth, this.cellHeight, this.defaultCellStyleClasses)
        this.cellArray[colIndex][cellIndex] = cell
        colElement.appendChild(cell.element)

        this.categoryPromises[colIndex]
            .then(category => {
                this.categories.push(category)
                cell.element.appendChild(document.createTextNode(category.title))
            })
    }
}
