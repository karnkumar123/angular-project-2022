import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../model/recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  editMode: boolean = false;
  serverId: number;
  recipeForm: FormGroup;
  constructor(private _activatedRoute: ActivatedRoute, 
              private _recipeService: RecipeService,
              private _router: Router) { }

  ngOnInit(): void {
    this._activatedRoute.params.subscribe((params: Params) => {
        this.serverId = +params['id'];
        if(this.serverId){
          this.editMode = true;
        }else{
          this.editMode = false;
        }
        this.initForm();
    })
  }

  private initForm(){
    let recipeName = '',
        recipeImagePath = '',
        description = '',
        recipeIngredients = new FormArray([]);

    if(this.editMode){
      this._recipeService.getOneRecipe(this.serverId).subscribe((recipeOne: Recipe) => {
        const recipe = recipeOne;
        recipeName = recipe.name;
        recipeImagePath = recipe.imagePath;
        description = recipe.description;
        if(recipe['ingredients']){
          for(let ing of recipe.ingredients){
            recipeIngredients.push(
              new FormGroup({
                'name': new FormControl(ing.name, Validators.required),
                'amount': new FormControl(ing.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
              })
            )
          }
        }
      })
    }
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'description': new FormControl(description, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'ingredients': recipeIngredients
    })
  }
  onSubmit(){
    const recipe: Recipe = {
      name: this.recipeForm.value['name'],
      description: this.recipeForm.value['description'],
      imagePath: this.recipeForm.value['imagePath'],
      ingredients: this.recipeForm.value['ingredients']
    }
    if(this.editMode){
      this._recipeService.updateRecipe(this.serverId, recipe).subscribe((recipe) => {
        console.log('successfully updated->', recipe);
        this._recipeService.getRecipes().subscribe((recipes: Recipe[]) => {
          this._recipeService.recipeChangedEvent.next(recipes);
        })
      })
    }else{
      this._recipeService.addRecipe(recipe).subscribe((recipe: Recipe) => {
        console.log('Successfully added->', recipe);
        this._recipeService.getRecipes().subscribe((recipes: Recipe[]) => {
          this._recipeService.recipeChangedEvent.next(recipes);
        })
      });
    }
    this.onCancel();
  }

  get controls(){
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }
  public addIngredients(){
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    )
  }

  onCancel(){
    this._router.navigate(['../'], {relativeTo: this._activatedRoute});
  }
  deleteIngredients(index: number){
    (<FormArray>(this.recipeForm.get('ingredients'))).removeAt(index);
  }
}
