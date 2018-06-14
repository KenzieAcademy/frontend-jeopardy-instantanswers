"use strict";
function Grid(height, width, gridElement) {
    this.height = height;
    this.width = width;
    this.name = name;
    this.clickCheck = false
    this.element = gridElement
    this.currentCell = null
    this.questionsArray = []
    this.fillGrid()
    // this.button = document.getElementById("answerButton").addEventListener('click', this.compareAnswer)
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
            // console.log(this.questionsArray)
            let categoryID = Math.floor(Math.random() * 17000)
            let catURL = "http://jservice.io/api/category/?id=" + categoryID
            fetch(catURL)
                .then(res => res.json())
                .then(category => {
                    console.log("Per col", category)

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
    },



    clickHandler: function (event) {
        const clickedCell = this.findCell(event.target.dataset.row, event.target.dataset.col)
        this.findNeighbors(clickedCell)
        this.displayQuestion(clickedCell)
        this.currentCell = clickedCell
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
        // console.log(' i click on this', clickedCell)
        for (let i = 0; i < this.neighbors.length; i++) {
            let xNeighbor = clickedCell.rowIndex + this.neighbors[i].x
            let yNeighbor = clickedCell.colIndex + this.neighbors[i].y
            let neighborCell = this.findCell(xNeighbor, yNeighbor)
            if (neighborCell) {
                neighborsArray.push(neighborCell)
            }
        }
        // console.log('neighbors', neighborsArray)
        return neighborsArray
    },



    displayQuestion: function (clickedCell) {
        if (this.clickCheck === true) return
        console.log(clickedCell.category)
        this.boundEvent = this.compareAnswer.bind(this, clickedCell)
        document.getElementById("questionTitleOutput").textContent = "Category Title: " + clickedCell.category.title
        document.getElementById("questionOutput").textContent = clickedCell.category.clues[clickedCell.colIndex - 1].question
        document.getElementById("pointValue").textContent = "Points: " + clickedCell.colIndex + "00"
        document.getElementById("answer").addEventListener('click', this.boundEvent)
        this.clickCheck = true
    },



    compareAnswer: function (clickedCell) {
        this.clickCheck = false
        document.getElementById("answer").removeEventListener('click', this.boundEvent)
        const userResponse = document.getElementById("userAnswer").value
        if (userResponse.toLowerCase() === clickedCell.category.clues[clickedCell.colIndex - 1].answer.toLowerCase()) {
            alert(" you win! ")
        } else {
            alert(" you lose! Try studying up, the correct answer was " + clickedCell.category.clues[clickedCell.colIndex - 1].answer)
            let correctAnswerSearch = document.createElement("a")
            document.createElement("div")
            let search = `https://api.duckduckgo.com/?q=${clickedCell.category.clues[clickedCell.colIndex - 1].answer}`
            let encodedSearch = encodeURI(search)
            // below link makes it appear as a text file, if it exist, above links to a duckduckgo.search display, like google but more secret
            // `https://api.duckduckgo.com/?q=${clickedCell.category.clues[clickedCell.colIndex - 1].answer}&format=json&pretty=1`
            correctAnswerSearch.setAttribute('href', encodedSearch)
            correctAnswerSearch.textContent = clickedCell.category.clues[clickedCell.colIndex - 1].answer
            document.body.appendChild(correctAnswerSearch)
            this.fetchAPI(clickedCell)
        }
    },



    fetchAPI: function (clickedCell) {
        fetch(`https://api.duckduckgo.com/?q=${clickedCell.category.clues[clickedCell.colIndex - 1].answer}&format=json&pretty=1`)
            .then(res => res.json())
            .then(searchDuck => {
                // this.displayAPI(clickedCell, searchDuck)
                console.log(searchDuck)
                // console.log(searchDuck.RelatedTopics)
                // console.log(searchDuck.RelatedTopics[0].Text)
                let element = document.getElementById("displayAPI")
                if (searchDuck.RelatedTopics[0].Text) {
                    element.textContent = searchDuck.RelatedTopics[0].Text
                }
                let picture = document.getElementById("displayPicture")
                picture.style.backgroundImage = "url(" + "'" + searchDuck.RelatedTopics[0].Icon.URL + "')"
            })
    },



    displayAPI: function (clickedCell, searchDuck) {
        console.log("hiiii daaaaddd")
        console.log(clickedCell)
        console.log(searchDuck)
        console.log(searchDuck.RelatedTopics[0])
        let element = document.getElementById("displayAPI")
        console.log(" inside the search")
        element.textContent = "hi dad"

    }

}