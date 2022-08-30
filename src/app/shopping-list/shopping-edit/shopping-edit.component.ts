import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredients.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  editedItemIndex: number;
  editedItem: Ingredient;
  editMode: boolean = false;
  editemItemSubscription: Subscription;
  @ViewChild('f') f: NgForm;
  constructor(private _slService: ShoppingListService) { }
  ngOnDestroy(): void {
    this.editemItemSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.editemItemSubscription = this._slService.editemItemIndexObservable.subscribe((index: number) => {
      this.editedItemIndex = index;
      this.editMode = true;
      this.editedItem = this._slService.getIngredient(this.editedItemIndex);
      this.f.setValue({
        'name': this.editedItem.name,
        'amount': this.editedItem.amount
      })
    })
  }
  additem(){
    const item = {
      name: this.f.value.name,
      amount: this.f.value.amount
    }
    if(this.editMode){
      this._slService.updateIngredient(this.editedItemIndex, item);
    }else{
      this._slService.addShoppingItem(item);
    }
    this.editMode = false;
    this.f.reset();
  }
  onClear(){
    this.f.reset();
    this.editMode = false; 
  }
  onDelete(){
    this._slService.deleteIngredient(this.editedItemIndex)
    this.onClear();
  }
}
