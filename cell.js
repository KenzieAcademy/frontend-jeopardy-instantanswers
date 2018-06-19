function Cell(colIndex, rowIndex, parentElement, grid) {
    this.rowIndex = rowIndex
    this.colIndex = colIndex
    this.parentElement = parentElement
    this.grid = grid

    this.add_element()
}

Cell.prototype = {
    constructor: Cell,

    add_element: function () {
        this.element = document.createElement("div")
        this.element.classList.add("cell")
        this.element.dataset.rowIndex = this.rowIndex
        this.element.dataset.colIndex = this.colIndex
        this.parentElement.appendChild(this.element)
    }
}