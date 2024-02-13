
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
    button.setAttribute("class", "grid-item");
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

    // Update the popup content
    popupTitle.textContent = data.name;
    popupImage.src = data.image;

    let ingredientsArray = Array.isArray(data.ingredients) ? data.ingredients : [data.ingredients];
    popupIngredients.innerHTML = ingredientsArray.map((ingredient) => `<li>${ingredient}</li>`).join("");
    // popupIngredients.innerHTML = data.ingredients.map((ingredient) => `<li>${ingredient}</li>`).join("");
    
    // Show the popup
    popupContainer.style.display = "block";
}

document.getElementById("closeButton").addEventListener("click", () => {
    let popupContainer = document.getElementById("popupContainer");
    // Hide the popup
    popupContainer.style.display = "none";
});

let form = document.getElementById("new-recipe")
form.addEventListener("submit", (e) => {
    e.preventDefault()

    let newRecipe = {
        name: e.target.name.value,
        image: e.target.image.value,
        ingredients: e.target["new-ingredients"].value,
    }
    console.log(newRecipe)
    foodFunction(newRecipe)
})
   


document.addEventListener("DOMContentLoaded", function() {
    const likeButton = document.querySelector(".btn"); 
    
    function handleLikeButtonClick(event) {
      const recipeName = document.querySelector(".name").textContent; 
      
      let likes = localStorage.getItem(recipeName) || 0; 
      likes++;
      
      localStorage.setItem(recipeName, likes);
      
      
      alert(`You liked ${recipeName}. Total likes: ${likes}`);
    }
    likeButton.addEventListener("click", handleLikeButtonClick);
  });
    
    
      
      
      

displayFoods()

