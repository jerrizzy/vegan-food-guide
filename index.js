
fetch("http://localhost:3000/mexican")
.then((response) => response.json())
.then((foods) => {
    console.log(foods)
    for (let food in foods) {
        let img = document.getElementsByClassName("meal-img")
        img.src = food.strCategoryThumb

        let div = document.getElementById("meal-display")
        div.append(img)
    }
})

