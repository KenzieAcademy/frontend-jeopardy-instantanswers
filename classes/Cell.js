function Cell(colIndex, cellIndex, width, height, styleClasses = []) {
    this.colIndex = colIndex
    this.cellIndex = cellIndex
    this.width = width
    this.height = height
    this.styleClasses = ["cell", ...styleClasses]
    this.neighborCells = []

    this.createElement()
}

Cell.prototype = {

    createElement: function () {
        this.element = document.createElement("div")
        this.element.classList.add("cell")
        this.element.dataset.column = this.colIndex
        this.element.dataset.cell = this.cellIndex
        this.element.style.width = this.width
        this.element.style.height = this.height

        this.element.classList.add(...this.styleClasses)
    },

    addToNeighborCells: function (cell) {
        this.neighborCells.push(cell)
    },

}