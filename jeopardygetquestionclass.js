
// function getQuestions() {
//     let category = {}
//     let arrayQuestions = []
//     while (arrayQuestions.length < 5) {
//         // console.log('hi mom', arrayQuestions.length)
//         let categoryID = Math.floor(Math.random() * 17000)
//         let catURL = "http://jservice.io/api/category/?id=" + categoryID
//         fetch(catURL)
//             .then(res => res.json())
//             .then(getCategory => {
//                 category = getCategory
//                 // console.log('humbug\n', category)

//             })
//         arrayQuestions.push(category)
//         console.log('what bring me info\n', category)
//         // console.log('what they ta', category)





//     }
//     console.log('array questions', arrayQuestions)
// }

// getQuestions()


// fetch(`http://jservice.io/categories/?$count= 100`)
//     .then(res => res.json())
//     .then(getCategory => {
//         console.log(getCategory)
//     })
