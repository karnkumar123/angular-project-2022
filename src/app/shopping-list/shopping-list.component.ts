import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredients.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[] = [];
  shoppingSubscription: Subscription;

  constructor(private _shoppingListService: ShoppingListService) { }

  ngOnDestroy(): void {
    this.shoppingSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this._shoppingListService.getIngredients().subscribe((ingredients: Ingredient[]) => {
      this.ingredients = ingredients;
    })
    
    this.shoppingSubscription = this._shoppingListService.ingredientsAdded
                                .subscribe(ingredients => this.ingredients = ingredients)
  }

  editItem(id: number){
    this._shoppingListService.editemItemIndexObservable.next(id);
  }
}
