function JeopardyGrid(options) {


    Grid.call(this, options);

    this.categories = [];
    this.categoryPromises = [];
    this.cluesCountError = new Error("Error: Too few valid clues.");
    this.getCategories(this.options.columns);

    console.log(this)
}

JeopardyGrid.prototype = Object.create(Grid.prototype)
JeopardyGrid.prototype.constructor = JeopardyGrid

JeopardyGrid.containsHTML = text => /(<.+?>)|(&.{1,6}?;)/.test(text);
JeopardyGrid.getRandomNumber = (max, min = 1) => Math.floor(Math.random() * (max - min + 1)) + min;
JeopardyGrid.trimArrayRandomly = function (array, targetLength) {
    const trimmedArray = [];
    const indexQueue = [];
    for (let iteration = 0; iteration < targetLength;) {
        const randomIndex = JeopardyGrid.getRandomNumber(array.length - 1, 0);
        if (!indexQueue.includes(randomIndex)) {
            trimmedArray.push(array[randomIndex]);
            iteration++;
        } else {
            iteration--;
        }
    }
    return trimmedArray;
}

JeopardyGrid.prototype.getCategories = function (numberOfCategoriesToGet) {
    for (let iteration = 0; iteration < numberOfCategoriesToGet; iteration++) {
        this.categoryPromises.push(this.getValidCategory());
    }

    return this.categoryPromises;
}

JeopardyGrid.prototype.getRandomCategory = function () {
    const randomOffset = JeopardyGrid.getRandomNumber(18419);
    return fetch(`http://jservice.io/api/categories?count=1&offset=${ randomOffset }`)
        .then(response => response.json())
        .then(([category]) => category)
}

JeopardyGrid.prototype.getValidCategory = function () {
    return this.getRandomCategory()
        .then(async category => {
            if (category.clues_count < this.options.columns) throw this.cluesCountError;
            
            await this.getClues(category.id)
                .then(clues => {
                    return category.clues = clues;
                })
                .then(clues => {
                    clues = clues.filter(clue => {
                        const hasValidProps = 
                            Boolean(clue.question) && 
                            Boolean(clue.answer) && 
                            Boolean(clue.value);

                        const containsNoHTML = 
                            JeopardyGrid.containsHTML(clue.question) &&
                            JeopardyGrid.containsHTML(clue.answer);

                        return hasValidProps && containsNoHTML;
                    })

                    if (clues.length < this.options.columns) throw this.cluesCountError;

                    console.log("clues", clues)
                    return clues;
                })
                .catch(error => {
                    if (error == this.cluesCountError) {
                        return this.getValidCategory(); // probable problem point
                    }
                })

            if (category.isInvalid) {
                console.log("are we getting this far?");
                throw "skip category";
            } else {
                return category;
            }
        })
        .catch(error => {
            if (error == this.cluesCountError) {
                return this.getValidCategory(); // probable problem point
            }
        })
        .then(categoryWithClues => { // probable problem point
            if (!categoryWithClues) return;

            categoryWithClues.clues = JeopardyGrid.trimArrayRandomly(categoryWithClues, this.options.columns);
            delete categoryWithClues.clues_count;
            this.categories.push(categoryWithClues);
            console.log("Category with clues:", categoryWithClues);
        })
}

JeopardyGrid.prototype.getClues = function (categoryID) {
    return fetch(`http://jservice.io/api/category?id=${ categoryID }`)
        .then(response => response.json())
        .then(({ clues }) => clues);
}

JeopardyGrid.prototype.createCells = function (rowIndex, rowDiv) {
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
}