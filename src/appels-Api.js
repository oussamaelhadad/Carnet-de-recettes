import axios from "axios";


const api = axios.create({
    baseURL: "https://dummyjson.com",
    timeout: 5000
});

export async function getRecipes(){
    const response = await api.get("/recipes/",{
        params:{
            limit: 12
        }
    }

    );
    return response.data;
};


export async function search(recipe){
    const response = await api.get("/recipes/search",{
    params: {
        q: recipe,
        limit: 12
    }
});
    return response.data;
};

export async function addRecipe (recipe){
    const response = await api.post("/recipes/add", recipe);
    return response.data;

}