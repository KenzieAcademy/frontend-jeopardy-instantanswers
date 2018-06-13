function Cell(colIndex, rowIndex, parentElement, grid) {
    this.rowIndex = rowIndex
    this.colIndex = colIndex
    this.parentElement = parentElement
    this.grid = grid
    // console.log(this.grid)

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
        this.element.addEventListener("click", this.handle_click)
    },

    handle_click: function (event) {
        let cellclicked = event.target;
        let clickedRow = Number(cellclicked.dataset.rowIndex)
        let clickedCol = Number(cellclicked.dataset.colIndex)
        console.log(this.grid)
        // this.grid.findCellByIndex(clickedRow,clickedCol)
        console.log(clickedRow,clickedCol);
        // this.checkneighbor_cells();
    },
}