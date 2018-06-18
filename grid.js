"use strict";

function Grid(options) {
    this.options = options;
    this.board = [];

    this.createElement();
    this.createRows();
    
}

Grid.prototype = {
    constructor: Grid,

    createElement: function () {
        this.element = document.createElement("div");
        this.element.addEventListener('click', this);
        this.element.classList.add("grid");
        this.options.parentElement.appendChild(this.element);
    },

    createRows: function () {
        for (let rowIndex = 0; rowIndex < this.options.rows; rowIndex++) {
            const rowDiv = document.createElement("div");
            rowDiv.className = "row";
            rowDiv.style.height = this.options.cell.height;
            this.element.appendChild(rowDiv);

            this.board.push([]);

            this.createCells(rowIndex, rowDiv);
        }
    },

    createCells: function (rowIndex, rowDiv) {
        for (let colIndex = 0; colIndex < this.options.columns; colIndex++) {

            const options = {
                classList: this.options.cell.classList,
                styles: {
                    width: this.options.cell.width,
                    height: this.options.cell.height,
                    border: this.options.cell.border,
                    backgroundColor: this.options.cell.color,
                },
                parentElement: rowDiv,
            };

            const cell = new Cell(rowIndex, colIndex, options);
            this.board[rowIndex].push(cell);
        }
    },

    findCell: function (rowIndex, colIndex) {
        
        return this.board[rowIndex][colIndex];

    },

    handleEvent: function(event){
        
        console.log(event.target.cellInstance);
    }
}