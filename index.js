"use strict";



const jeopardyGrid = new JeopardyGrid({
    rows: 6,
    columns: 6,
    parentElement: document.querySelector("main"),

    cell: {
        width: "90px",
        height: "60px",
        border: "3px solid black",
        color: "blue",
        classList: ["cell", "hidden"],
    }
});
