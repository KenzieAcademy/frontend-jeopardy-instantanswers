"use strict";


function Category() {

    this.fetchCategoryID()

}



//retrieves a random question, and therefore a random category--will need to make an array of id's used, and only get category if not in array
Category.prototype.fetchCategoryID = function () {
    fetch("http://jservice.io/api/random")
        .then(resObj => resObj.json())
        .then(hydrateData => {
            // console.log(hydrateData)
            this.categoryID = hydrateData[0].category.id

            // this.fetchCategoryObj(this.categoryID)
            let catURL = "http://jservice.io/api/category/?id=" + this.categoryID
            // console.log(catURL)
            fetch(catURL)
                .then(resObj => resObj.json())
                .then(hydrateData => {
                    console.log('hi data', hydrateData)
                    this.categoryObject = hydrateData
                })
        })
}



Category.prototype.fetchCategoryObj = function (categoryID) {

    let catURL = "http://jservice.io/api/category/?id=" + categoryID
    // console.log(catURL)
    fetch(catURL)
        .then(resObj => resObj.json())
        .then(hydrateData => {
            console.log('hi data', hydrateData)
            this.categoryObject = hydrateData
        })

    // http://jservice.io/api/category/?id=3170
}

// let newCategory = new Category()



function fetchQuestion() {
    fetch("http://jservice.io/api/category/?id=16279")
        .then(responseObject => responseObject.json())
        .then(hydrateBody => {
            console.log('what what', hydrateBody)
            console.log('what what', hydrateBody.title)
            // console.log(hydrateBody[0].question)
            // console.log(hydrateBody[0].answer)

        })
}

// fetchQuestion()