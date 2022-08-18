let mainHeader = document.getElementById("mainHeader");
let mainHeaderContainer = document.getElementById("mainHeaderContainer");
let mainPageImg = document.getElementById("mainPageImg")
let input = document.getElementById("input")
let button = document.getElementById("button")
let recipeContainer = document.getElementById("recipeContainer")

mainHeader.onmouseover = function(){
    mouseOver();
}

mainHeader.onmouseout = function(){
    mouseOut();
}

function mouseOver() {
    mainHeader.style.fontSize = "350%";
    mainHeader.style.color = "#0088a9";
}
  
function mouseOut() {
    mainHeader.style.fontSize = "275%";
    mainHeader.style.color = "#283747";
}

// function fadeOutOnScroll(element) {
//     if (!element) {
//       return;
//     }
    
//     let distanceToTop = window.pageYOffset + element.getBoundingClientRect().top;
//     let elementHeight = element.offsetHeight;
//     let scrollTop = document.documentElement.scrollTop;
    
//     let opacity = 1;
    
//     if (scrollTop > distanceToTop) {
//       opacity = 1 - (scrollTop - distanceToTop) / elementHeight;
//     }
    
//     if (opacity >= 0) {
//       element.style.opacity = opacity;
//     }
//   }
// function scrollHandler() {
//     fadeOutOnScroll(mainHeaderContainer);
//   }
// window.addEventListener('scroll', scrollHandler);


input.addEventListener("keypress", function(event){
    if(event.key === "Enter"){
        event.preventDefault();
        document.getElementById("button").click();
    }
});

// fetching the food api and displaying the data retreived from it based on the input users provide
button.onclick = function(event){
  event.preventDefault()
  let input = document.querySelector("input").value
  fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${input}&addRecipeInformation=true&apiKey=cbe7394d07c9409dbad6ca4be089171c`)
      .then(function(response) {
          return response.json();
      })
      .then(function(data){
        recipeContainer.innerHTML = "";
        let item = data.results;
        console.log(item)
        for(let i=0;i<item.length;i++){
          console.log(item[i])
          //a new div for each recipe which will hold the information about the respective recipes
          let itemDiv = document.createElement("div")
          itemDiv.setAttribute("id","itemDiv")

          //a new div for the text aspects to separate them from the image
          let foodTextDiv = document.createElement("div")
          foodTextDiv.setAttribute("id","foodTextDiv")

          //a new div for the image aspect to separate them from the text
          let foodImageDiv = document.createElement("div")
          foodImageDiv.setAttribute("id","foodImageDiv")

            //imageSrc
            let foodImage = document.createElement("img")
            foodImage.src = item[i].image;
            foodImage.setAttribute("id","foodImage")
            
            //title
            let foodTitle = document.createElement("h2")
            foodTitle.innerHTML = item[i].title
            foodTitle.setAttribute("id","foodTitle")

            //instructions
            let foodLinkContainer = document.createElement("a")
            foodLinkContainer.innerHTML = ("Recipe and More!")
            foodLinkContainer.target = "_blank"
            foodLinkContainer.href = item[i].spoonacularSourceUrl
            foodLinkContainer.setAttribute("id","foodLinkContainer")
            
            //ready
            let foodReady = document.createElement("p")
            foodReady.innerHTML = "Ready within "+item[i].readyInMinutes+" minutes"
            foodReady.setAttribute("id","foodReady")
            
            //appending the data 
            foodImageDiv.append(foodImage)
            foodTextDiv.append(foodTitle, foodReady, foodLinkContainer)
            itemDiv.append(foodTextDiv,foodImageDiv)
            recipeContainer.append(itemDiv)
        }
      })
}