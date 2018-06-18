"use strict";

function Board(height, width, gridElement) {
    this.height = height
    this.width = width
    this.gridElement = gridElement
    this.grid = []
    this.sampleArray = new Array(this.height).fill().map(() => new Array(this.width).fill(0))
}
Board.prototype = {

    createBoard: function (height, width, element) {
        this.createElement()
        this.grid.push([])
        this.sampleArray.forEach((row, rowIndex) => {
            rowIndex.forEach((_,cellIndex) => {
                sampleArray[rowIndex][cellIndex] = new place()
            } 
        )
    })
        console.log(this.sampleArray)
        for (let rowIndex = 0; rowIndex < this.height; rowIndex++) {

            fetch(`http://jservice.io/api/category?id=${rowIndex+1}`)
                .then(response => response.json())
                .then(category => {
                    const rowElement = document.createElement("div")
                    rowElement.classList.add("row")
                    this.element.appendChild(rowElement)
                    this.sampleArray.push(category)
                    for (let colIndex = 0; colIndex < this.width; colIndex++) {
                        let cell = new Cell(rowIndex, colIndex, rowElement, category)
                        this.grid[rowIndex].push(cell)
                    }
                })
        }
    },
    createElement: function (gridElement) {

        this.element = document.createElement("div")
        this.element.id = "grid"
        this.gridElement.appendChild(this.element)
    },
    constructor: Board,
}
const inputs = new Board(6, 6, document.getElementById("output"))

inputs.createBoard()