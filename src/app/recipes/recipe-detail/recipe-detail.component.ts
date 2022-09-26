import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Params, Router } from '@angular/router';
import { Ingredient } from 'src/app/shared/ingredients.model';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { Recipe } from '../model/recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  selectedRecipe: Recipe;
  recipeId: number;
  constructor(
    private _recipeService: RecipeService, 
    private _activatedRoute: ActivatedRoute,
    private _slService: ShoppingListService,
    private _router: Router) { }

  ngOnInit(): void {
    this._activatedRoute.data.subscribe((data: Data) => {
      this.selectedRecipe = data['recipe'];
    })
    // this._activatedRoute.params.subscribe((params: Params) => {
    //   this.recipeId = params['id'];
    //   this._recipeService.getOneRecipe(this.recipeId).subscribe((recipe: Recipe) => {
    //     this.selectedRecipe = recipe;
    //   })
    // })
  }

  toShoppingList(){
    let ingredients = this._recipeService.addToShoppingList(this.selectedRecipe.ingredients);
    console.log('added');
    this._slService.ingredientsAdded.next(ingredients);
  }

  deleteRecipe(){
    this._recipeService.deleteRecipe(this.recipeId).subscribe((data: any) => {
      console.log('Deleted:', data);
      this._recipeService.getRecipes().subscribe((recipes: Recipe[]) => {
        this._recipeService.recipeChangedEvent.next(recipes);
        this._router.navigate(['/recipe']);
      })
    })
  }
}
