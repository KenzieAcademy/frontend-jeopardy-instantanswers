const valueGridConfig = {
    numberOfColumns: 6,
    numberOfCellsInColumn: 1,
    parentElement: document.querySelector("main"),
    cellWidth: "7.5rem",
    cellHeight: "6rem",
    defaultCellStyleClasses: ["unclicked"]
}

const titleGridConfig = {
    numberOfColumns: 1,
    numberOfCellsInColumn: 6,
    parentElement: document.getElementById("header"),
    cellWidth: "7.5rem",
    cellHeight: "6rem",
}
titleGrid = new JeopardyGrid(titleGridConfig)
col1Grid = new JeopardyGrid(valueGridConfig)
col2Grid = new JeopardyGrid(valueGridConfig)
col3Grid = new JeopardyGrid(valueGridConfig)
col4Grid = new JeopardyGrid(valueGridConfig)
col5Grid = new JeopardyGrid(valueGridConfig)
col6Grid = new JeopardyGrid(valueGridConfig)