import { Subject } from 'rxjs/Subject';

import { Recipe } from './recipe.model';
import { Ingredient } from './ingredient.model';

export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe(
      'Razzy Blue Smoothie',
      'This naturally sweet and creamy, frosty cold smoothie packs a lot of flavor and a nutritious punch.',
      'http://atpresentmagazine.com/wp-content/uploads/2017/07/BlueberryMuffinSmoothie-iowagirleats.jpg',
      [
        new Ingredient('whole almonds', 16, ''),
        new Ingredient('rolled oats', 0.25, 'cups'),
        new Ingredient('flaxseed meal', 1, 'tbspn'),
        new Ingredient('frozen blueberries', 1, 'cups'),
        new Ingredient('rasberry yogurt', 20, 'cups'),
        new Ingredient('concord grape juice', 0.25, 'cups'),
        new Ingredient('1% buttermilk', 1, 'cups')
      ],
      'Mix and refrigerate'
    ),
    new Recipe('Italian Hazelnut Cookies ',
      "Two crunchy hazelnut cookie halves, filled with a soft layer of Nutella® hazelnut spread. Is there anything better on a winter's day?",
      'http://images.media-allrecipes.com/userphotos/560x315/4581406.jpg',
      [
        new Ingredient('ground hazlenuts', 2, 'cups'),
        new Ingredient('all-purpose flour', 1.66, 'cups'),
        new Ingredient('confectioner sugar', 1.5, 'cups'),
        new Ingredient('butter', 0.75, 'cups'),
        new Ingredient('egg yolks', 2, ''),
        new Ingredient('salt', 1, 'pinch'),
        new Ingredient('Nutella hazelnut spread', 0.5, 'cups')
      ],
      'Mix and bake'
    )
  ];

  getRecipes() {
    //returns a copy of the recipe array instead of the array itself
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
