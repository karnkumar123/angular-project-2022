import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { Ingredient } from "../shared/ingredients.model";
import { Logger } from "../shared/logger.service";

@Injectable()
export class ShoppingListService{
    ingredientsAdded = new Subject<Ingredient[]>();
    editemItemIndexObservable = new Subject<number>();

    constructor(private _http: HttpClient, private _logger: Logger){}

    getIngredients(): Observable<Ingredient[]>{
        this._logger.logMessage('The getIngredients has been called!');
        let url = '/api/ingredients';
        return this._http.get<Ingredient[]>(url);
    }

    getIngredient(index: number): Observable<Ingredient>{
        let url = '/api/ingredients/'+index;
        return this._http.get<Ingredient>(url);
    }

    addShoppingItem(ing: Ingredient): Observable<Ingredient>{
        let url = '/api/ingredients';
        return this._http.post<Ingredient>(url, ing);
    }

    addToShoppingList(ingredients: Ingredient[]): Ingredient[]{
        let url = '/api/ingredients';
        let response: Array<Ingredient> = [];
        ingredients.forEach(async (ingredient: Ingredient) => {
            let responseData: any = await this._http.post(url,ingredient).toPromise();
            response.push(responseData);
        })
        return response;
    }
    updateIngredient(index: number, newItem: Ingredient): Observable<Ingredient>{
        let url = '/api/ingredients/'+index;
        return this._http.patch<Ingredient>(url, newItem);
    }

    deleteIngredient(index: number){
        let url = '/api/ingredients/'+index;
        return this._http.delete(url);
    }
}