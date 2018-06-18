"use strict";



const grid = new Grid({
    rows: 7,
    columns: 6,
    parentElement: document.querySelector("main"),

    cell: {
        width: "60px",
        height: "45px",
        border: "4px solid black",
        color: "blue",
        classList: ["cell"],
    }
});

// const grid2 = new Grid({
//     rows: 100,
//     columns: 100,
//     parentElement: document.querySelector("main"),

//     cell: {
//         width: "6px",
//         height: "6px",
//         border: "2px solid white",
//         color: "black",
//         classList: ["cell"],
//     }
// });


