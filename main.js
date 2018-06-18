"use strict";

const category = new Grid(6, 1, "cat-head", document.getElementById("categories"));
const board = new Grid(6, 5, "board-val", document.getElementById("jep-board"));



console.log(document.getElementById("cat-head").querySelectorAll("div"))

// fetch ("http://jservice.io/api/categories?count=6")
//     .then(response => response.json())
//     .then(hydrated => {
//         document.getElementById("cat-head")
//     })