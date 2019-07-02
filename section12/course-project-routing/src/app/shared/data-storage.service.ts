import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  constructor(private http: HttpClient,
              private recipeService: RecipeService) {
  }

  saveRecipes() {
    const recipes = this.recipeService.getRecipes();
    return this.http.put('https://ng-course-recipe-book-da7d2.firebaseio.com/recipes.json', recipes)
      .subscribe(response => {
        console.log(response);
      });
  }
}
