import { Ingredient } from "src/app/shared/ingredients.model";

export const SHOPPING_ITEMS = [
    {
        "name": "Meat",
        "amount": 2,
        "id": 1
    },
    {
        "name": "Wheat",
        "amount": 4,
        "id": 2
    },
    {
        "name": "Bread",
        "amount": 12,
        "id": 5
    }
]

export const SHOPPING_ITEMS_BY_ID = function(id: number): Ingredient{
    const item = SHOPPING_ITEMS.find(items => items.id === id)!;
    return item;
}