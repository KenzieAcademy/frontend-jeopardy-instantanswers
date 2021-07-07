"use strict";
function Grid(height, width, gridElement) {
    this.height = height;
    this.width = width;
    this.name = name;
    this.sampleArray = new Array(this.width).fill().map(cell => new Array(this.height).fill(0))
    this.element = gridElement
    this.questionsArray = []
    this.fillGrid()
    this.pointsEarned = 0
    this.pointsPossible = 0
    // this.button = document.getElementById("answerButton").addEventListener('click', this.compareAnswer)
    this.element.addEventListener('click', this.clickHandler.bind(this))
}

Grid.prototype = {

    fillGrid: function () {
        this.sampleArray.forEach((_, colIndex) => {
            this.findValidCategories(colIndex);
        })
    },

    findValidCategories: function (colIndex) {
        this.findCategory()
            .then(category => {
                const validQuestions = this.findValidQuestions(category);

                if (validQuestions.length < 5) {
                    this.findValidCategories(colIndex);
                    return
                }
                category.clues = validQuestions;
                this.createColumn(colIndex, category);
            })
    },

    findCategory: function () {
        let catURL = "http://jservice.io/api/category/?id=" + Math.floor(Math.random() * 17000);
        return fetch(catURL).then(res => res.json());
    },


    findValidQuestions: function (category) {
        const containsHTML = text => /(<.+?>)|(&.{1,6}?;)/.test(text);

        // const validAnswers = category.clues.filter(({ answer }) => !containsHTML(answer))  // with destructuring
        category.clues.filter(question => (question.answer));
        console.log(category.clues)
        const blueQuestions = category.clues.filter(question => console.log(!question.answer));
        const validQuestions = category.clues.filter(question => !containsHTML(question.answer) && question.answer && question.question);

        return validQuestions;
    },

    createColumn: function (colIndex, category) {
        const colElement = document.createElement("section");
        colElement.dataset.col = colIndex;
        this.element.appendChild(colElement);
        this.sampleArray[colIndex].forEach((_, rowIndex) => {

            this.sampleArray[colIndex][rowIndex] = new Cell(colIndex, rowIndex, colElement, this, category);

        })
    },


    clickHandler: function (event) {
        const clickedCell = this.findCell(event.target.dataset.row, event.target.dataset.col);

        this.displayQuestion(clickedCell);
        this.currentCell = clickedCell;
    },



    findCell: function (rowIndex, columnIndex) {
        const row = this.sampleArray[parseInt(rowIndex)];
        // if (row) {
        //     return row[parseInt(columnIndex)]
        // } else {
        //     return null
        // }
        return row && row[parseInt(columnIndex)];
    },

    displayQuestion: function (clickedCell) {
        if (this.clickCheck === true) return;
        if (clickedCell.element.textContent === clickedCell.category.clues[clickedCell.colIndex - 1].question) return;
        if (clickedCell.element.textContent === clickedCell.category.title) return;
        console.log(clickedCell)
        console.log(clickedCell.category);
        clickedCell.element.textContent = clickedCell.category.clues[clickedCell.colIndex - 1].question
        this.boundEvent = this.compareAnswer.bind(this, clickedCell);
        document.getElementById("questionTitleOutput").textContent = "Category Title: " + clickedCell.category.title;
        document.getElementById("questionOutput").textContent = clickedCell.category.clues[clickedCell.colIndex - 1].question;
        document.getElementById("pointValue").textContent = "Points: " + clickedCell.colIndex + "00";
        document.getElementById("answer").addEventListener('click', this.boundEvent);
        this.clickCheck = true;
    },



    compareAnswer: function (clickedCell) {
        this.clickCheck = false;
        document.getElementById("answer").removeEventListener('click', this.boundEvent);
        const userResponse = document.getElementById("userAnswer").value;
        //removes back slashes from answer
        clickedCell.category.clues[clickedCell.colIndex - 1].answer = clickedCell.category.clues[clickedCell.colIndex - 1].answer.replace(/[\\]+/g, "")
        if (clickedCell.category.clues[clickedCell.colIndex - 1].answer.toLowerCase().includes(userResponse.toLowerCase()) && userResponse.toLowerCase().length > 2) {

            this.pointsEarned += (clickedCell.colIndex * 100);
            document.getElementById("pointsEarned").textContent = "Points Earned: " + this.pointsEarned;
            clickedCell.element.classList.add("correctResponse")

            alert(" you are correct! " + clickedCell.category.clues[clickedCell.colIndex - 1].answer);
        } else {
            alert(" you lose! Try studying up, the correct answer was " + clickedCell.category.clues[clickedCell.colIndex - 1].answer);
            let duckCredit = document.getElementById("creditDuck");
            let search = `https://duckduckgo.com/`;
            let encodedSearch = encodeURI(search);
            duckCredit.textContent = "Results from DuckDuckGo";
            duckCredit.setAttribute('href', encodedSearch);
            this.pointsEarned -= (clickedCell.colIndex * 100);
            document.getElementById("pointsEarned").textContent = "Points Earned: " + this.pointsEarned;
            clickedCell.element.classList.add("incorrectResponse")
            this.fetchAPI(clickedCell);
        }
        this.pointsPossible += (clickedCell.colIndex * 100);
        document.getElementById("pointsPossible").textContent = "Points Possible: " + this.pointsPossible;
    },



    fetchAPI: function (clickedCell) {
        fetch(`https://api.duckduckgo.com/?q=${clickedCell.category.clues[clickedCell.colIndex - 1].answer}&format=json&pretty=1`)
            .then(res => res.json())
            .then(searchDuck => {
                console.log(searchDuck);
                let element = document.getElementById("displayAPI");
                if (searchDuck.RelatedTopics[0].Text) {
                    element.textContent = searchDuck.RelatedTopics[0].Text;
                }
                let picture = document.getElementById("displayPicture");
                picture.style.backgroundImage = "url(" + "'" + searchDuck.RelatedTopics[0].Icon.URL + "')";
            })
    },



    displayAPI: function (clickedCell, searchDuck) {


        let element = document.getElementById("displayAPI");
        console.log(" inside the search");
        element.textContent = "hi dad";
    }
}