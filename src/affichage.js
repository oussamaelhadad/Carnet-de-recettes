import { getRecipes } from "./appels-Api";
import "./style.css";



const cartes = document.getElementById("recipes-cartes");
const compteur = document.getElementById("recipes-count");

export function displayRecipes(recipes) {
    
    cartes.innerHTML=""
    

    
    compteur.textContent = `${recipes.length} recipes`;


    if(recipes.length === 0){
        const message = document.createElement("p");
        const btn = document.createElement("button");


        message.textContent = "Aucune recette trouvée.";
        btn.textContent = "Revoir toutes les recettes";


        message.className="text-center text-red-500 text-[27px]";
        btn.className = "bg-purple-600 text-white px-6 py-3 rounded-lg mt-4";
                   

        cartes.appendChild(message);
        cartes.appendChild(btn);

      btn.addEventListener("click", async () => {

        const searchInput = document.getElementById("search-input")
        searchInput.value = ""

        const data = await getRecipes();
        
        
        displayRecipes(data.recipes);
        
    }
    );

        return;
    }

    recipes.forEach(recipe => {

        const card = document.createElement("div");
        const image = document.createElement("img");
        const titre = document.createElement("h3");
        const details = document.createElement("p");


        image.src = recipe.image;
        image.alt = recipe.name;

        titre.textContent = recipe.name
        details.textContent = [`${recipe.prepTimeMinutes} min`,
        `${recipe.difficulty}`,
        `${recipe.cuisine}`]
        

        card.className = "bg-purple-100 rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition";
        image.className = "w-full h-48 object-cover";
        titre.className = "text-xl font-bold p-4 text-gray-800";
        details.className = "px-4 pb-4 text-sm text-gray-600";

        card.appendChild(image);
        card.appendChild(titre);
        card.appendChild(details)

        cartes.appendChild(card);
    });
}
