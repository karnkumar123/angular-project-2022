import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Recipe } from '../model/recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipeList: Recipe[];
  private recipechangedSubscription: Subscription;
  constructor(
    private _recipeService: RecipeService,
    private _router: Router,
    private _activateRoute: ActivatedRoute) { }
  ngOnDestroy(): void {
    this.recipechangedSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.recipechangedSubscription = this._recipeService.recipeChangedEvent.subscribe((recipes: Recipe[]) => {
      this.recipeList = recipes;
    })
    this._recipeService.getRecipes().subscribe((responseData) => {
      this.recipeList = responseData;
    });
  }
  activeRecipeItem(){
    this._router.navigate(['new']);
  }

  onNewRecipe(){
    this._router.navigate(['new'], {relativeTo: this._activateRoute});
  }
}
