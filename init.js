const titleGridElement = document.querySelector("#header")
const questionGridElement = document.querySelector("main")

const categories = [ "11534", "11537", "11518", "11546", "11570", "11503" ]



const questionGridConfig = {
    numberOfColumns: 5,
    numberOfCellsInColumn: 6,
    parentElement: questionGridElement,
    cellWidth: "9rem",
    cellHeight: "8rem",
    defaultCellStyleClasses: ["unclicked"],
    categories
}

const titleGridConfig = {
    numberOfColumns: 1,
    numberOfCellsInColumn: 6,
    parentElement: titleGridElement,
    cellWidth: "9rem",
    cellHeight: "8rem",
    categories
}

const titleGrid = new JeopardyTitleGrid(titleGridConfig)
const questionGrid = new JeopardyQuestionGrid(questionGridConfig, titleGrid)
// questionGrid.setupEvents()
