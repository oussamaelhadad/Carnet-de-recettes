import { search, getRecipes, addRecipe } from "./appels-Api.js";
import { displayRecipes } from "./affichage.js";


let recipesList = [];

const loading = document.getElementById("loading");

function afficherLoading() {
    loading.classList.remove("hidden");
}

function cacherLoading() {
    loading.classList.add("hidden");
}

try {
    afficherLoading();

    const data = await getRecipes();

    recipesList = data.recipes;

    displayRecipes(recipesList);

}
catch (error) {
    console.log("Erreur de chargement :", error.message);
}

finally{
    cacherLoading();
}


const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");

searchForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    searchInput.classList.remove("border-red-500");
    searchInput.placeholder = "Rechercher une recette...";

    const recipe = searchInput.value.trim();

    if (recipe) {
        try {
            afficherLoading();
            const data = await search(recipe);
            displayRecipes(data.recipes);
        }
        catch (error) {
            console.log(error);
        }

        finally{
            cacherLoading();
        }
    }
    else {
        searchInput.classList.add("border-red-500");
        searchInput.placeholder = "Veuillez saisir une recette";
    }
});


const form = document.getElementById("add-recipe-form");

const nameInput = document.getElementById("recipe-name");
const cuisineInput = document.getElementById("recipe-cuisine");
const difficultyInput = document.getElementById("recipe-difficulty");
const timeInput = document.getElementById("recipe-time");




form.addEventListener("submit", async (event) => {
    event.preventDefault();
const name = nameInput.value.trim();
const time = Number(timeInput.value);
const cuisine = cuisineInput.value.trim();
const difficulty = difficultyInput.value;

const nameError = document.getElementById("name-error");
const timeError = document.getElementById("time-error");
const cuisineError = document.getElementById("cuisine-error");
const difficultyError = document.getElementById("difficulty-error");

let valider = true;

if (name.length < 3 || name.length > 60) {
    nameError.textContent = "Le nom doit contenir entre 3 et 60 caractères.";
    valider = false;
}
 else {
    nameError.textContent = "";
}

if(time < 1 || time > 300 || timeInput.value === ""){
    timeError.textContent = "le temps de recipe doit reste entre 1 et 300.";
    valider = false;
}
 else{
    timeError.textContent ="";
 }

 if(cuisine===""){
    cuisineError.textContent ="Voullez entrer la cuisine";
    valider = false;
 }
    else{
        cuisineError.textContent = "";
    }

if (difficulty === "") {
    difficultyError.textContent = "Veuillez choisir une difficulté.";
    valider = false;
}
 else {
    difficultyError.textContent = "";
}

if (valider) {
    console.log("Formulaire valide !");
} 
else {
    console.log("Formulaire invalide !");
}

if (valider) {

    const recipe = {
        name: name,
        cuisine: cuisine,
        difficulty: difficulty,
        prepTimeMinutes: time
    };

   try {
    const newRecipe = await addRecipe(recipe);

    console.log(newRecipe);

   recipesList.unshift(newRecipe);

    displayRecipes(recipesList);

    const messageSucces = document.getElementById("message-succes");

    messageSucces.textContent = "Recette ajoutée avec succès !";
    messageSucces.className = "text-green-600 mt-3";

    form.reset();

}

catch (error) {
   
 console.log("Erreur :", error.message);                                

}
}
});

