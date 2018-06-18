"use strict";

function Cell (rowIndex, colIndex, options) {
    this.rowIndex = rowIndex;
    this.colIndex = colIndex;
    this.options = options;

    this.createElement();
    this.setStyles();
}

Cell.prototype.createElement = function () {
    this.element = document.createElement("div");

    this.element.dataset.rowIndex = this.rowIndex;
    this.element.dataset.colIndex = this.colIndex;
    this.element.cellInstance = this;

    this.options.parentElement.appendChild(this.element);
}

Cell.prototype.setStyles = function () {
    this.element.classList.add(...this.options.classList);

    this.element.style.width = this.options.styles.width;
    this.element.style.height = this.options.styles.height;
    this.element.style.backgroundColor = this.options.styles.backgroundColor;
    this.element.style.border = this.options.styles.border;
}