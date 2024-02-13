
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
    
    
      
      
      