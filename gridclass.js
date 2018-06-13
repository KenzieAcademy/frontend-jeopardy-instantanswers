"use strict";


function Grid(height, width, gridElement) {
    this.height = height;
    this.width = width;
    this.name = name;
    this.element = gridElement
    this.fillGrid()
    this.neighbors = [
        {
            x: 0,
            y: 1
        },
        {
            x: 0,
            y: -1
        },
        {
            x: 1,
            y: 0
        },
        {
            x: 1,
            y: -1
        },
        {
            x: 1,
            y: 1
        },
        {
            x: -1,
            y: 0
        },
        {
            x: -1,
            y: 1
        },
        {
            x: -1,
            y: -1
        }
    ]
}

Grid.prototype = {

    fillGrid: function () {

        this.element.addEventListener('click', this.clickHandler.bind(this))
        this.sampleArray = new Array(this.width).fill().map(cell => new Array(this.height).fill(0))
        this.sampleArray.elementProperty = "elementProperty"
        this.sampleArray.forEach((_, colIndex) => {
            let categoryID = Math.floor(Math.random() * 17000)
            // console.log(categoryID)

            let catURL = "http://jservice.io/api/category/?id=" + categoryID
            fetch(catURL)
                .then(res => res.json())
                .then(category => {
                    // console.log("Per col", category)

                    this.sampleArray[colIndex] = category.clues
                    const colElement = document.createElement("section")
                    colElement.dataset.col = colIndex
                    this.element.appendChild(colElement)

                    _.forEach((question, rowIndex) => {
                        // console.log(category)
                        this.sampleArray[colIndex][rowIndex] = new Cell(colIndex, rowIndex, colElement, this, category)

                        // cell.element.dataset.category = question.categoryName
                    })

                })

        })

        // })

    },

    clickHandler: function (event) {
        const clickedCell = this.findCell(event.target.dataset.row, event.target.dataset.col)
        this.findNeighbors(clickedCell)
    },

    findCell: function (rowIndex, columnIndex) {
        const row = this.sampleArray[parseInt(rowIndex)]
        // if (row) {
        //     return row[parseInt(columnIndex)]
        // } else {
        //     return null
        // }
        return row && row[parseInt(columnIndex)]
    },

    findNeighbors: function (clickedCell) {
        let neighborsArray = []

        console.log(' i click on this', clickedCell)
        for (let i = 0; i < this.neighbors.length; i++) {
            let xNeighbor = clickedCell.rowIndex + this.neighbors[i].x
            let yNeighbor = clickedCell.colIndex + this.neighbors[i].y
            let neighborCell = this.findCell(xNeighbor, yNeighbor)

            if (neighborCell) {
                neighborsArray.push(neighborCell)
            }
        }
        console.log('neighbors', neighborsArray)
        return neighborsArray
    },
}