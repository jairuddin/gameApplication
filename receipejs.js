const searchBox = document.getElementById('serachBox'); //input classname
const searchBtn = document.getElementById('seachBtn');// button class
const recipeContainer = document.getElementById('recipe-container');//selecter cotener
const recipeDetailsContent = document.getElementById('recipe-details-content');
const receipCloseBtn = document.getElementById('receip-close-btn');

// ==============function============
const fetchRecipes = async (query) => {
    recipeContainer.innerHTML = "<h2>Fetching Recipes....</h2>"
    const data = await fetch(`http://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    console.info(data);
    const responses =await data.json();
    // console.log(responses);
    // ==for erch loop======
    recipeContainer.innerHTML ="";
    responses.meals.forEach(meal => {
        // console.log(meal);

        const recipeDiv=document.createElement('div');
        recipeDiv.classList.add('recipe');
        recipeDiv.innerHTML=  `
        <img src="${meal.strMealThumb}" >
        <h3>${meal.strMeal}</h3>
        <p><span>${meal.strArea}</span>Disses</p>
        <p><span>${meal.strcategory}</span> Caregory</p>
        
        `
        const button = document.createElement('button');
        button.textContent = "View Recipe";
        recipeDiv.appendChild(button);

        // adding .addEvelListener to rexipe button
        button.addEventListener('click', ()=>{
            openRecipePopup(meal);
        })


        recipeContainer.appendChild(recipeDiv);
    });

}

const fetchIngredients =(meal) =>{
    let ingredientsList = "";
    for(let i=1; i<=20; i++){
        const ingredient =meal[`strIngredient${i}`];
        if(ingredient){
            const measure =meal[`strMeasure${i}`];
            ingredientsList += `<li>   ${measure}  ${ingredient} </li>`
        }
        else{
            break;
        }

    }
    return ingredientsList;
}

const openRecipePopup =(meal)  =>{
    recipeDetailsContent.innerHTML =`
    <h2 class="recipeName"> ${meal.strMeal}</h2>
     <h3>Ingredents:</h3>
     <ul  class="ingredientList">${fetchIngredients(meal)}</ul>
     <div>
        <h3>Instruction:</h3>
        <p class="recipeInstructions">${meal.strInstructions}</p>
     </div>
    `
  
    recipeDetailsContent.parentElement.style.display="block";
}


receipCloseBtn.addEventListener('click',()=>{
    recipeDetailsContent.parentElement.style.display = "none";
} );


searchBtn.addEventListener('click', (e) => { 
    e.preventDefault();
    // console.log("button Clicked");
    const searchInput = searchBox.value.trim();
    // console.info(searchInput);

    fetchRecipes(searchInput);


});

