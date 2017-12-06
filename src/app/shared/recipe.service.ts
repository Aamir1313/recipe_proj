import { EventEmitter } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from './ingredient.model';

export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe(
      'Tasty Schnitzel',
      'A super-tasty Schnitzel - just awesome!',
      'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
      [
        new Ingredient('Meat', 1, 'lbs'),
        new Ingredient('French Fries', 20, 'lbs')
      ],
      'do it'
    ),
    new Recipe('Big Fat Burger',
      'What else you need to say?',
      'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
      [
        new Ingredient('Buns', 2, 'lbs'),
        new Ingredient('Meat', 1, 'lbs')
      ],
      'do more of it'
    )
  ];

  getRecipes() {
    //returns a copy of the recipe array instead of the array itself
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }
}
