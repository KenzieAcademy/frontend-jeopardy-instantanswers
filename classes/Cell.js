"use strict";

function Cell(rowIndex, colIndex, cellHeight, cellWidth, cellColor, parentElement) {
    this.rowIndex = rowIndex;
    this.colIndex = colIndex;
    this.cellHeight = cellHeight;
    this.cellWidth = cellWidth;
    this.cellColor = cellColor;
    this.parentElement = parentElement;
    this.createCell();
}

Cell.prototype = {
    createCell: function() {
        this.div = document.createElement("div");
        this.div.classList.add("cell");
        this.div.style.width = this.cellWidth + "px";
        this.div.style.height = this.cellHeight + "px";
        this.div.style.backgroundColor = this.cellColor;
        this.div.dataset.rowIndex = this.rowIndex;
        this.div.dataset.colIndex = this.colIndex;
        this.parentElement.appendChild(this.div);
    }
}