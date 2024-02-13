
const displayFoods = () => {
fetch("http://localhost:3000/mexican")
.then((response) => response.json())
.then((foods) => {
    for (let food of foods) {
        foodFunction(food) 
        }
    })
}

const foodFunction = (data) => {
    let img = document.createElement("img")
    img.src = data.image

    let h3 = document.createElement("h3")
    h3.textContent = data.name;

    let div = document.querySelector("#food-menu")

    let button = document.createElement("button")
    button.setAttribute("id", "getIngredientsButton")
    button.textContent = "Get Ingredients"

    div.append(img, h3, button)
    

    button.addEventListener("click", () => {
        handleIngredientButton(data)
})}

const handleIngredientButton = (data) => {
        let popupContainer = document.getElementById("popupContainer")
        let popupTitle = document.getElementById("popupTitle")
        let popupImage = document.getElementById("popupImage")
        let popupIngredients = document.getElementById("popupIngredients")
        let closeButton = document.getElementById("closeButton")

        // Update the popup content
      popupTitle.textContent = data.name;
      popupImage.src = data.image;
      popupIngredients.innerHTML = data.ingredients.map((ingredient) => `<li>${ingredient}</li>`).join("");
      console.log(data.ingredients)
      // Show the popup
      popupContainer.style.display = "block";
}

document.getElementById("closeButton").addEventListener("click", () => {
    let popupContainer = document.getElementById("popupContainer");
    // Hide the popup
    popupContainer.style.display = "none";
});
   

displayFoods()