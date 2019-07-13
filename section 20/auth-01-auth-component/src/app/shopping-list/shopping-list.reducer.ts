import { Action } from '@ngrx/store';
import { Ingredient } from '../shared/ingredient.model';

const initState = {
    ingredients: [
      new Ingredient('Apples', 5),
      new Ingredient('Tomatoes', 10),
    ]
  }
;

export function shoppingListReducer(state = initState, action: Action) {
  switch (action.type) {
    case 'ADD_INGREDIENT':
      return {
        ...state,
        ingredients: [...state.ingredients, action]
      };
  }
}
