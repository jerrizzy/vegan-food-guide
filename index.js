
const displayFoods = (cuisine) => {
    const foodMenu = document.getElementById("food-menu");
    // Clear existing food items
    foodMenu.innerHTML = "";

    fetch(`http://localhost:3000/${cuisine}`)
    .then((response) => response.json())
    .then((foods) => {
        for (let food of foods) {
            foodFunction(food) 
            }
        })
}

// create the div to place the food info in
const foodFunction = (data) => {

    let parentDiv = document.querySelector("#food-menu")

    let childDiv = document.createElement("div")
    childDiv.setAttribute("class", "grid-food")

    let img = document.createElement("img")
    img.src = data.image

    let h3 = document.createElement("h3")
    h3.textContent = data.name;
    
    let button = document.createElement("button")
    button.setAttribute("class", "grid-item");
    button.textContent = "Get Ingredients"

    let likeButton = document.createElement("button");
  likeButton.setAttribute("class", "btn");
  
  let likes = localStorage.getItem(data.name) || 0; // Retrieve likes count from local storage
  console.log(likes)


  likeButton.textContent = `👍 ${likes}`; // Update button text with initial likes count

  likeButton.addEventListener("click", () => {
    likes = parseInt(likes) + 1; // Increment likes count
    likeButton.textContent = `👍 ${likes}`; // Update button text

    localStorage.setItem(data.name, likes); // Save updated likes count to local storage
  });

  childDiv.append(img, h3, button, likeButton)

  parentDiv.append(childDiv);

  button.addEventListener("click", () => {
    handleIngredientButton(data);
  });
};
    

const handleIngredientButton = (data) => {
    let popupContainer = document.getElementById("popupContainer")
    let popupTitle = document.getElementById("popupTitle")
    let popupImage = document.getElementById("popupImage")
    let popupIngredients = document.getElementById("popupIngredients")

    // Update the popup content
    popupTitle.textContent = data.name;
    popupImage.src = data.image;

    // our ingredients key holds an array in our db.json, but 
    // the user input when creating their food comes as a string 
    // so this code checks if data.ingredients is an array, and if not it turns it into an array.
    let ingredientsArray = Array.isArray(data.ingredients) ? data.ingredients : [data.ingredients];
    popupIngredients.innerHTML = ingredientsArray.map((ingredient) => `<li>${ingredient}</li>`).join("");
    
    // Show the popup
    popupContainer.style.display = "block";
}

document.getElementById("closeButton").addEventListener("click", () => {
    let popupContainer = document.getElementById("popupContainer");
    // Hide the popup
    popupContainer.style.display = "none";
});

let form = document.getElementById("vegan-recipe")
form.addEventListener("submit", (e) => {
    e.preventDefault()

    let newRecipe = {
        name: e.target.name.value,
        image: e.target.image.value,
        ingredients: e.target["new-ingredients"].value,
        category: e.target.category.value,
    }
    foodFunction(newRecipe)
})


let category = document.getElementById("category");

category.addEventListener("change", () => {
  displayFoods(category.value);
});

// Call displayFoods initially with the default cuisine
displayFoods(category.value);


// const likeButton = document.querySelector(".btn");
// let likes = 0;
// let foodId = 0;

// likeButton.addEventListener("click", () => {
//     likes = likes + 1

//     fetch()
// })
