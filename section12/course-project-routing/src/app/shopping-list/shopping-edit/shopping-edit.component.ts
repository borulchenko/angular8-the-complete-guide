import { NgForm } from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  editMode = false;
  editedIndex: number;

  constructor(private slService: ShoppingListService) {
  }

  ngOnInit() {
  }

  onAddItem(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    this.slService.addIngredient(newIngredient);
    this.subscription = this.slService.startedEditing.subscribe((index: number) => {
      this.editMode = true;
      this.editedIndex = index;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
