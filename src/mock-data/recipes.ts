import { Recipe } from "src/app/recipes/model/recipe.model";
import { Ingredient } from "src/app/shared/ingredients.model";

export const RECIPES: Recipe[] = [
    new Recipe(
        'A Burger', 
        'Burger is very tasty', 
        'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F44%2F2020%2F03%2F03%2F7782449.jpg',
        [new Ingredient('Meat', 2), new Ingredient('Wheat', 4)]
        ),
    new Recipe(
        'A Pizza', 
        'Pizza is very tasty', 
        'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F44%2F2020%2F03%2F03%2F7782449.jpg',
        [new Ingredient('Meat', 2), new Ingredient('Wheat', 4)]
        ),
    new Recipe(
        'A Donut', 
        'Donut is very tasty', 
        'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F44%2F2020%2F03%2F03%2F7782449.jpg',
        [new Ingredient('Meat', 2), new Ingredient('Wheat', 4)]),
    new Recipe(
        'A Litti', 
        'Litti is very tasty', 
        'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F44%2F2020%2F03%2F03%2F7782449.jpg',
        [new Ingredient('Meat', 2), new Ingredient('Wheat', 4)])
];