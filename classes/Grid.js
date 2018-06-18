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
        return Array(this.numberOfCellsInColumn).fill('0').map(() => new Array(this.numberOfColumns).fill('0'))
    },


    createColumn: function () {
        this.cellArray = []
        for (let colIndex in this.createGameGridArray()) {
            const colElement = document.createElement("div")
            colElement.classList.add("column")
            
            this.cellArray.push([])
            this.parentElement.appendChild(colElement)
            for (let cellIndex in this.createGameGridArray()[colIndex]) {
                const cell = new Cell(colIndex, cellIndex, this.cellWidth, this.cellHeight, this.defaultCellStyleClasses)
                this.cellArray[colIndex].push(cell)
                colElement.appendChild(cell.element)
            }
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