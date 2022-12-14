import * as api from './api.js';
import { endpoints,addOwner } from './data.js';



export async function getRecipes(page, query) {
    if(query){
        query = {
            name:{
                $text:{
                    $search: query
                }
            }
        };
    }


    return api.get(endpoints.recipes());
}


export async function getRecentRecipes() {
    return api.get(endpoints.recent);
}

export async function getRecipeById(id) {
    return api.get(endpoints.recipeDetails(id));
}

export async function createRecipe(recipe) {
    addOwner(recipe);
    return api.post(endpoints.recipes,recipe);
}

export async function updateRecipe(id,recipe) {
    return api.put(endpoints.recipeByID + id,recipe);
}

export async function deleteRecipe(id) {
    return api.del(endpoints.recipeByID + id);
}