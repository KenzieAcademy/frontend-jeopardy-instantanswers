const JeopardyGrid = function (config) {
    
    this.categoryIDs = config.categories
    this.categoryPromises = []
    this.categories = []
    this.getCategories()

    Grid.call(this, config)
}

JeopardyGrid.prototype = Object.create(Grid.prototype)
JeopardyGrid.prototype.constructor = JeopardyGrid

JeopardyGrid.prototype.getCategories = function () {
    for (let categoryID of this.categoryIDs) {
        this.categoryPromises.push(new Fetch(categoryID))
    }
}
