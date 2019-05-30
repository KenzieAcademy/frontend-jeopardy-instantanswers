function Grid({ numberOfColumns, numberOfCellsInColumn, parentElement, cellWidth, cellHeight, defaultCellStyleClasses = [] }) {
    this.numberOfColumns = numberOfColumns
    this.numberOfCellsInColumn = numberOfCellsInColumn
    this.parentElement = parentElement
    this.cellWidth = cellWidth
    this.cellHeight = cellHeight
    this.defaultCellStyleClasses = defaultCellStyleClasses

    this.createGameGridArray()
    this.createColumn()
}


Grid.prototype = {
    createGameGridArray: function () {
        this.cellArray = new Array(this.numberOfCellsInColumn).fill().map(() => new Array(this.numberOfColumns).fill())
    },


    createColumn: function () {
        for (let colIndex in this.cellArray) {
            const colElement = document.createElement("div")
            colElement.classList.add("column")

            this.parentElement.appendChild(colElement)
            this.createCell(colIndex, colElement)
        }
    },

    createCell: function (colIndex, colElement) {
        console.log("createCell", this.cellArray[colIndex])
        for (let cellIndex in this.cellArray[colIndex]) {
            const cell = new Cell(colIndex, cellIndex, this.cellWidth, this.cellHeight, this.defaultCellStyleClasses)
            this.cellArray[colIndex][cellIndex] = cell
            colElement.appendChild(cell.element)
        }
    },


    findSpecificCell: function (colIndex, cellIndex) {
        console.log(this.cellArray)
        const col = this.cellArray[colIndex]

        if (col) {
            return col[cellIndex]
        }
        return null
    },
}