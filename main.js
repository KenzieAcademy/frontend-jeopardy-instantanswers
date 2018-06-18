'use strict'

const output = document.getElementById("output")

function Categories() {

        const button = document.createElement("button")
        let buttonText = document.createTextNode("answer")
        button.appendChild(buttonText)
        output.appendChild(button)
        button.dataset.id = button
        const input = document.createElement("input")
        output.appendChild(input)
}

Categories();