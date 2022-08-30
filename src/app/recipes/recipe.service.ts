import { EventEmitter, Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { Ingredient } from "../shared/ingredients.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./model/recipe.model";
@Injectable()
export class RecipeService{
    constructor(private _slService: ShoppingListService){}
    private recipeList: Recipe[] = [
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

    getRecipes(): Recipe[]{
        return [...this.recipeList];
    }

    getOneRecipe(id: number): Recipe{
       return this.recipeList[id];
    }

    addToShoppingList(ingredients: Ingredient[]){
        this._slService.addToShoppingList(ingredients);
    }
}