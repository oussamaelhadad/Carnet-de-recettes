import axios from "axios";


const api = axios.create({
    baseURL: "https://dummyjson.com",
    timeout: 5000
});

export async function getRecipes(){
    
    try{
         const response = await api.get("/recipes/",{
        params:{
            limit: 12
        }
    });
    return response.data;
    }

    catch(error){
        gererErreur(error);
    }
   
};


export async function search(recipe){
    
    try{
        const response = await api.get("/recipes/search",{
    params: {
        q: recipe,
        limit: 12
    }
    });
    return response.data;
    }

    catch(error){
        gererErreur(error);
    }
};

export async function addRecipe (recipe){
    
    try{
        const response = await api.post("/recipes/add", recipe);
     return response.data;
    }

    catch(error){
        gererErreur(error);
    }
};

export async function removeRecipe (id){
    
    try{
    const response = await api.delete(`/recipes/${id}`);
    return response.data;
    }

    catch(error){
        gererErreur(error);
    }
}


function gererErreur(error) {

    if (!error.response) {
        throw new Error("Serveur injoignable.");
    }

    if (error.response.status === 404) {
        throw new Error("Recette introuvable (404).");
    }

    if (error.response.status >= 500) {
        throw new Error("Erreur du serveur (500).");
    }

    throw new Error("Une erreur est survenue.");
}
