import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../model/recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipeList: Recipe[];

  constructor(
    private _recipeService: RecipeService,
    private _router: Router,
    private _activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.recipeList = this._recipeService.getRecipes();
  }
  activeRecipeItem(){
    this._router.navigate(['new']);
  }

  onNewRecipe(){
    this._router.navigate(['new'], {relativeTo: this._activateRoute});
  }
}
