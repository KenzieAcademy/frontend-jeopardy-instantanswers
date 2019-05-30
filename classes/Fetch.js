"use strict"

function Fetch(categoryID) {
    this.categoryID = categoryID
    this.baseURI = "http://jservice.io/api/category?id="

    return this.fetchCategory()
}


Fetch.prototype.fetchCategory = async function () {
    const response = await fetch(this.baseURI + this.categoryID)
    return response.json()
}
