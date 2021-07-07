function Grid (row, col, destination) {
    this.gridArray = new Array(row).fill().map(() => new Array(col).fill())
    this.destination = destination
    this.categoryRow = []
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
        if (rowIndex === 0) this.categoryRow.push(cell)
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
    this.element.instanceOfCell = this
    rowDiv.appendChild(this.element)
}

Cell.prototype.constructor = Cell