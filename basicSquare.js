function BasicSquare (rowIndex, colIndex, parentElement, grid) {
    Cell.call(this, rowIndex, colIndex, parentElement, grid)
    this.element.classList.add("lightcell")
}

BasicSquare.prototype = Object.create(Cell.prototype)
BasicSquare.prototype.constructor = BasicSquare