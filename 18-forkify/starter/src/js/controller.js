//import images or icon from parcel
import icons from 'url:../img/icons.svg'; //parcel 2 for images and videos 
import 'core-js/stable';
import 'regenerator-runtime/runtime'

const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

//function you can use elswhere,
const renderSpinner = function(parentEL){
  const html = `
        <div class="spinner">
          <svg>
            <use href="${icons}#icon-loader"></use>
          </svg>
        </div> 
        `
        //clear the parentEL first
        parentEL.innerHTML = '';
        //insert html to the dom
        parentEL.insertAdjacentHTML('afterbegin', html)

};


 
const showRecipe = async function() {
  try {
    //listen to hash id
    //const id = window.location.hash.slice(1) //remove # from the start
    //return if id

    //if(!id) return;
    

    //1) Loading recipe
    //spinner should load when ever recipe loads

    renderSpinner(recipeContainer)

    //2:08 
    const res = await fetch(`
    https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886s`)
    //https://forkify-api.herokuapp.com/api/v2/${id}`)
    const data = await res.json()
    //if response is false 
    if(!res.ok) throw new Error(`${data.message} (${res.status})`)
    //refomat data object with underscore

     //let recipe = data.data.recipe; since we have recipe on both sides use recipe

     let {recipe} = data.data;
     
//change objects names in recipe object

   recipe = {
    id:recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    servings: recipe.servings,
    image: recipe.image_url,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
   }

   console.log(recipe)
    console.log(res, data)

   const html = `
   <figure class="recipe__fig">
   <img src="${recipe.image}" alt="${recipe.title}" class="recipe__img" />
   <h1 class="recipe__title">
     <span>${recipe.title}</span>
   </h1>
 </figure>

 <div class="recipe__details">
   <div class="recipe__info">
     <svg class="recipe__info-icon">
       <use href="${icons}#icon-clock"></use>
     </svg>s
     <span class="recipe__info-data recipe__info-data--minutes">${recipe.cookingTime}</span>
     <span class="recipe__info-text">minutes</span>
   </div>
   <div class="recipe__info">
     <svg class="recipe__info-icon">
         <use href="${icons}#icon-users"></use>
     </svg>
     <span class="recipe__info-dat a recipe__info-data--people">${recipe.servings}</span>
     <span class="recipe__info-text">servings</span>

     <div class="recipe__info-buttons">
       <button class="btn--tiny btn--increase-servings">
         <svg>
           <use href="${icons}#icon-minus-circle"></use>
         </svg>
       </button>
       <button class="btn--tiny btn--increase-servings">
         <svg>
           <use href="${icons}#icon-plus-circle"></use>
         </svg>
       </button>
     </div>
   </div>

   <div class="recipe__user-generated">
     <svg>
      <use href="${icons}#icon-user"></use>
     </svg>
   </div>
   <button class="btn--round">
     <svg class="">
      <use href="${icons}#icon-bookmark-fill"></use>
     </svg>
   </button>
 </div>

 <div class="recipe__ingredients">
   <h2 class="heading--2">Recipe ingredients</h2>
   <ul class="recipe__ingredient-list">

   ${recipe.ingredients.map(ing => {
    return `
    <li class="recipe__ingredient">
       <svg class="recipe__icon">
         <use href="${icons}#icon-check"></use>
       </svg>
       <div class="recipe__quantity">${ing.quantity}</div>
       <div class="recipe__description">
         <span class="recipe__unit">${ing.unit}</span>
         ${ing.description}
       </div>
     </li>
    `
   }).join('')}
   </ul>
 </div>

 <div class="recipe__directions">
   <h2 class="heading--2">How to cook it</h2>
   <p class="recipe__directions-text">
     This recipe was carefully designed and tested by
     <span class="recipe__publisher">${recipe.publisher}</span>. Please check out
     directions at their website.
   </p>
   <a
     class="btn--small recipe__btn"
     href="${recipe.sourceUrl}"
     target="_blank"
   >
     <span>Directions</span>
     <svg class="search__icon">
       <use href="${icons}#icon-arrow-right"></use>
     </svg>
   </a>
 </div>`;

 //empty the html

 recipeContainer.innerHTML = ""
 //insert this html to the dom, always do it on the parent of the container


 recipeContainer.insertAdjacentHTML('afterbegin',html)
  } catch (error) {
    alert(error)
  }
}



showRecipe()