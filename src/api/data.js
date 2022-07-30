import * as api from './api.js';


export const login = api.login;
export const register = api.register;
export const logout = api.logout;

const endpoints = {
    recipes: '/classes/Recipe',

}

export async function getRecipes() {
    return api.get(endpoints.recipes);
}

export async function createRecipe(recipe, ownerId) {
     recipe.owner={
        __type:'Pointer',
        className:'_User',
        objectId:ownerId
    };
    return api.post(endpoints.recipes,recipe);
}