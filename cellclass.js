function Cell(rowIndex, colIndex, parent, grid, newCategory) {
    this.rowIndex = rowIndex;
    this.colIndex = colIndex;
    this.parent = parent;
    this.grid = grid;
    this.newCategory = newCategory
    this.createCell();
}

Cell.prototype.createCell = function () {
    this.element = document.createElement("article");
    this.element.dataset.row = this.rowIndex;
    this.element.dataset.col = this.colIndex;
    this.parent.appendChild(this.element);
    console.log('hi mom', this.newCategory)
    // console.log(this.grid)
    this.addText(this.element)
}

Cell.prototype.addText = function (element) {
    if (this.colIndex === 0) {
        this.element.textContent = this.newCategory.title
    } else {
        this.element.textContent = this.newCategory.clues[this.colIndex - 1].value
    }

}