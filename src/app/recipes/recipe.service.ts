import { EventEmitter, Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { Ingredient } from "../shared/ingredients.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./model/recipe.model";
import { HttpClient } from '@angular/common/http';

@Injectable()
export class RecipeService{
    recipeChangedEvent = new Subject<Recipe[]>();
    constructor(
        private _slService: ShoppingListService,
        private _http: HttpClient){}

    getRecipes(): Observable<Recipe[]>{
        let url = "/api/recipes";
        return this._http.get<Recipe[]>(url);
    }

    getOneRecipe(id: number): Observable<Recipe>{
        let url = "/api/recipes/"+id;
        return this._http.get<Recipe>(url);
    }

    addToShoppingList(ingredients: Ingredient[]){
        return this._slService.addToShoppingList(ingredients);
    }

    addRecipe(recipe: Recipe): Observable<Recipe>{
        let url = '/api/recipes';
        return this._http.post<Recipe>(url, recipe);
    }

    updateRecipe(index: number, recipe: Recipe): Observable<Recipe>{
        let url = '/api/recipes/'+index;
        return this._http.put<Recipe>(url, recipe);
    }

    deleteRecipe(index: number){
        let url = "/api/recipes/"+index;
        return this._http.delete(url);
    }
}
