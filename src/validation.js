import { search, getRecipes } from "./appels-Api.js";
import { displayRecipes } from "./affichage.js";


const data = await getRecipes();
displayRecipes(data.recipes);

console.log(data);


const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");

searchForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    searchInput.classList.remove("border-red-500");
    searchInput.placeholder = "Rechercher une recette...";

    const recipe = searchInput.value.trim();

    if (recipe) {
        try {
            const data = await search(recipe);
            displayRecipes(data.recipes);
        }
        catch (error) {
            console.log(error);
        }
    }
    else {
        searchInput.classList.add("border-red-500");
        searchInput.placeholder = "Veuillez saisir une recette";
    }
});