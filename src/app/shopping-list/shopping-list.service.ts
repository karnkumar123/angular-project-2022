import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredients.model";

export class ShoppingListService{
    ingredientsAdded = new Subject<Ingredient[]>();
    editemItemIndexObservable = new Subject<number>();
    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5)
      ];

    getIngredients(): Ingredient[]{
        return [...this.ingredients];
    }

    getIngredient(index: number): Ingredient{
        return this.getIngredients()[index];
    }

    addShoppingItem(ing: Ingredient): void{
        this.ingredients.push(new Ingredient(ing.name, ing.amount));
        this.ingredientsAdded.next([...this.ingredients]);
    }
    addToShoppingList(ingredients: Ingredient[]){
        this.ingredients.push(...ingredients);
        this.ingredientsAdded.next([...this.ingredients]);
    }
    updateIngredient(index: number, newItem: Ingredient){
        this.ingredients[index] = newItem;
        this.ingredientsAdded.next([...this.ingredients]);
    }
    deleteIngredient(index: number){
        this.ingredients.splice(index, 1);
        this.ingredientsAdded.next([...this.ingredients]);
    }
}