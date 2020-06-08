function Grid(numberOfRows, numberOfCols, parentElement) {
    this.numberOfRows = numberOfRows
    this.numberOfCols = numberOfCols
    this.parentElement = parentElement
}

Grid.prototype = {
   constructor: Grid,

    board_create: function () {
        this.board = new Array(this.numberOfRows).fill().map(() => new Array(this.numberOfCols).fill());
        this.board.forEach((row, rowIndex) => {
            this.board[rowIndex] = []
            const rowElement = this.create_row()
            row.forEach((_, colIndex) => {
                this.board[rowIndex][colIndex] = new BasicSquare(rowIndex, colIndex, rowElement, this);

            });
        });
    },
    create_col: function () {
        const colElement = document.createElement("div")
        colElement.classList.add("col")
        this.parentElement.appendChild(colElement)
        return colElement
    }
    
    }