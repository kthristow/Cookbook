import { getRecipes } from '../api/recipe.js';
import { html,until } from '../lib.js';
import { createSubmitHandler, parseQuery } from '../util.js';
import { spinner } from './common.js';

const catalogTemplate = (recipePromise,onSearch,search = '') => html`<section id="catalog">
<div class="section-title">
    <form @submit=${onSearch}id="searchForm">
        <input type="text" name="search" value=${search}>
        <input type="submit" value="Search">
    </form>
</div>

<header class="section-title">
    Page 2 of 3
    <a class="pager" href="/catalog/1">&lt; Prev</a>
    <a class="pager" href="/catalog/3">Next &gt;</a>
</header>

${until(recipePromise,spinner())}
<footer class="section-title">
    Page 2 of 3
    <a class="pager" href="/catalog/1">&lt; Prev</a>
    <a class="pager" href="/catalog/3">Next &gt;</a>
</footer>

</section>
`

const recipePreview = (recipe) => html`<a class="card" href="/details/${recipe.objectId}">
<article class="preview">
    <div class="title">
        <h2>${recipe.name}</h2>
    </div>
    <div class="small"><img src=${recipe.img}></div>
</article>
</a>
` 

export function catalogPage(ctx) {
    const query = parseQuery(ctx.queryString);

    ctx.render(catalogTemplate(loadRecipes(), createSubmitHandler(onSearch,'search'),query.search));

    function onSearch(data){
        if(data.search){
              ctx.page.redirect(`/catalog?search=${encodeURIComponent(data.search)}`);
        }else{
            ctx.page.redirect('/catalog')
        }
    }
}


async function loadRecipes() {
    const {results: recipes} = await getRecipes();

    if(recipes.length == 0){
        return html`<p>No recipes found. Be the first to post a recipe!</p>`;
    }
    else{
        return recipes.map(recipePreview);
    }
   
}
