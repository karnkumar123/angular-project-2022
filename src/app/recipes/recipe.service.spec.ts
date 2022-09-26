// import { RecipeService } from "./recipe.service";
// import { ShoppingListService } from '../shopping-list/shopping-list.service';
// import { RECIPES } from '../../mock-data/recipes';
// import { INGREDIENTS } from '../../mock-data/ingredients';
// import { Ingredient } from "../shared/ingredients.model";
// import { Recipe } from '../recipes/model/recipe.model';
// import { TestBed } from "@angular/core/testing";


// describe('service: Recipe', () => {

//     let recipeService: RecipeService;
//     let shoppingListServiceSpy: any;
//     beforeEach(() => {
//         shoppingListServiceSpy = jasmine.createSpyObj('ShoppingListService', ['addToShoppingList']);
//         TestBed.configureTestingModule({
//             providers: [
//                 RecipeService,
//                 {provide: ShoppingListService, useValue: shoppingListServiceSpy}
//             ]
//         })
//         recipeService = TestBed.inject(RecipeService);
//         recipeService.recipeList = [...RECIPES]; // assigning mock data
// ;        
//     })

//     fit('function: getRecipes', () => {
//         expect(recipeService.getRecipes()).toEqual(recipeService.recipeList);
//     })

//     it('function: getOneRecipe', () => {
//         let index = 2;
//         expect(recipeService.getOneRecipe(index)).toBe(recipeService.recipeList[index]);
//     })

//     it('function: addToShoppingList', () => {
//         let ingredients: Ingredient[] = INGREDIENTS;
//         expect(recipeService.addToShoppingList(ingredients)).toBeUndefined();
//         expect(shoppingListServiceSpy.addToShoppingList).toHaveBeenCalledTimes(1);
//     })

//     it('function: addRecipe', () => {
//         let recipe: Recipe = new Recipe(
//             'Coffee', 
//             'Coffee is very tast',
//             'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F44%2F2020%2F03%2F03%2F7782449.jpg',
//             [
//                 new Ingredient('Milk', 10),
//                 new Ingredient('Coffee Powder', 0.2)
//             ] 
//             );

//         recipeService.addRecipe(recipe);
//         let lastRecipeItem = recipeService.recipeList[recipeService.recipeList.length-1];
//         expect(lastRecipeItem.name).toBe('Coffee');
//         expect(lastRecipeItem.description).toBe( 'Coffee is very tast');
//         expect(lastRecipeItem.imagePath).toBe('https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F44%2F2020%2F03%2F03%2F7782449.jpg');
//         expect(lastRecipeItem.ingredients.length).toBe(recipe.ingredients.length);
//         expect(lastRecipeItem.ingredients[1].name).toBe('Coffee Powder')
//     })

//     it('function: updateRecipe', () => {
//         let index = 2, 
//             recipe: Recipe = new Recipe(
//                 'Coffee', 
//                 'Coffee is very tast',
//                 'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F44%2F2020%2F03%2F03%2F7782449.jpg',
//                 [
//                     new Ingredient('Milk', 10),
//                     new Ingredient('Coffee Powder', 0.2)
//                 ] 
//                 );

//         recipeService.updateRecipe(index, recipe)
//         expect(recipeService.recipeList[index].name).toBe('Coffee');
//         expect(recipeService.recipeList[index].ingredients[1].amount).toBe(0.2);
//     })

//     it('function: deleteRecipe', () => {
//         let index = 1,
//             recipeLength = recipeService.recipeList.length,
//             recipeLengthAfterDelete = recipeLength-1;

//         expect(recipeService.getRecipes().length).toBe(recipeLength);
//         recipeService.deleteRecipe(index);
//         expect(recipeService.getRecipes().length).toBe(recipeLengthAfterDelete);
//     })
// })