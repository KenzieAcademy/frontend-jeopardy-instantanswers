"use strict";

function Board(height, width, gridElement) {
    this.height = height
    this.width = width
    this.gridElement = gridElement
    this.grid = new Array(this.height).fill().map(() => new Array(this.width).fill())
    this.sampleArray = new Array(this.height).fill()
}
Board.prototype = {

    createBoard: function (height, width, element) {
        this.createElement()
        this.grid.forEach((_, rowIndex) => {

            const rowElement = document.createElement("div")
            rowElement.classList.add("row")
            this.element.appendChild(rowElement)

            for (let colIndex = 0; colIndex < this.width; colIndex++) {
                this.grid[rowIndex][colIndex] = new Cell(rowIndex, colIndex, rowElement)
            }

            this.fetchData(rowIndex, 1)
        })
    },

    createElement: function (gridElement) {

        this.element = document.createElement("div")
        this.element.id = "grid"
        this.gridElement.appendChild(this.element)

    },
    fetchData: function (rowIndex, offset) {
        fetch(`http://jservice.io/api/category?id=${rowIndex + offset}`)
            .then(response => response.json())
            .then(category => {
                console.log(category)
                if (category.clues.length < this.width || category.value === null && category.clues === null) {
                    this.fetchData(rowIndex, offset + 1)
                    return
                }

                this.assignCategory(category, rowIndex)

                this.sampleArray[rowIndex].forEach((categoryClue, cellIndex) => {
                  //  this.assignValue(category)

                    const text = (cellIndex === 0) ?
                        document.createTextNode(category.title) :
                        document.createTextNode(categoryClue.question)

                    this.grid[rowIndex][cellIndex].cellElement.appendChild(text)
                })
            })
    },

    assignCategory: function (category, rowIndex) {
        let startingPoint = Math.floor(Math.random() * category.clues.length - this.width) + 1
        if (startingPoint < 1) startingPoint = 1
        this.sampleArray[rowIndex] = category.clues.slice(startingPoint, startingPoint + this.width)
        this.sampleArray[rowIndex].title = category.title
    },
   
    constructor: Board,
}

const inputs = new Board(6, 6, document.getElementById("output"))


inputs.createBoard()