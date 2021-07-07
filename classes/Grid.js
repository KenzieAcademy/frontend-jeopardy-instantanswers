"use strict";

//Grid constructor function.
function Grid(width, height, otherId, parentElement) {
    this.width = width;
    this.height = height;
    this.otherId = otherId;
    this.parentElement = parentElement;
    this.gridArray = [];
    this.createGridElement();   
    this.createRowsAndCells();
    
}

Grid.prototype = {
    createGridElement: function () {
        this.element = document.createElement("div");
        this.element.classList.add("grid");
        this.parentElement.appendChild(this.element);
    },

    createRowsAndCells: function () {
        for (let rowIndex = 0; rowIndex < this.height; rowIndex++) {
            this.gridArray.push([])
            const rowElement = document.createElement("div");
            rowElement.id = this.otherId;
            rowElement.classList.add("row");
            rowElement.dataset.index = rowIndex;
            this.element.appendChild(rowElement);
            this.appendCellToRow(rowIndex, rowElement);
        }
    },

    appendCellToRow: function (rowIndex, rowElement) {
        
        for (let colIndex = 0; colIndex < this.width; colIndex++) {
            const cell = new Cell(rowIndex, colIndex, 100, 150, "blue", rowElement);
            this.gridArray[rowIndex].push(cell);
            cell.div.innerHTML = "test"
        }
    },
}