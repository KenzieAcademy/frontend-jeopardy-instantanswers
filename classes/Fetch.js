"use strict"

function Fetch(categoryID) {
    this.categoryID = categoryID
    this.baseURI = "http://jservice.io/api/category?id="

    return this.fetchCategory()
}


Fetch.prototype.fetchCategory = async function () {
    const response = await fetch(this.baseURI + this.categoryID)
    return await response.json()
}

// // Fetch.prototype.getNeededInfo = function (){



// console.log(this.narniaCategory)

// wordsForYoungstersCategory = new Fetch("11537")
// mondayMondayCategory = new Fetch("11518")
// theNifty1930sCategory = new Fetch("11546")
// fourIsOnlyCategory = new Fetch("11570")

// const baseURI = "http://jservice.io/api/category?id="

// function fetchNewCategory(id) {
//     fetch(baseURI + id)
//         .then(res => res.json())
//         .then(category => {
//             console.log(category)
//             clueOne = category.clues[0].answer
//             console.log(clueOne)
//         })
// }
// fetchNewCategory("11503")

// const title = document.getElementById("title")



