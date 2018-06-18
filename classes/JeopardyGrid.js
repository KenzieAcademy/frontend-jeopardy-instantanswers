const JeopardyGrid = function (config) {
    Grid.call(this, config)
    this.baseURI = "http://jservice.io/api/category?id="
    this.categoryURIs = ["11503", "11534", "11537", "11518", "11546", "11570"]
        .map(id => this.baseURI + id)

    this.returnCategories()
}

JeopardyGrid.prototype = Object.create(Grid.prototype)
JeopardyGrid.prototype.constructor = JeopardyGrid

JeopardyGrid.prototype.returnCategories = function () {

    Promise.all(this.categoryURIs.map(uri => fetch(uri)))
        .then(responses => {

            Promise.all(responses.map(res => res.json()))
                .then(categories => {
                    this.categories = categories
                    // narniaCategory = categories[1]
                    // wordsForYoungstersCategory = categories[2]
                    // mondayMondayCategory = categories[3]
                    // theNifty1930sCategory = categories[4]
                    // fourIsOnlyCategory = categories[5]
                    // console.log(categoryList)
                    // console.log(c)
                    // return this.categories
                    danswersCategory = this.categories[0]
                    console.log(this.categories)
                })
        })

}