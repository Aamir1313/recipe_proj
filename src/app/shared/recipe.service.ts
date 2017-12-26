import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/Rx';

import { Recipe } from './recipe.model';
import { Ingredient } from './ingredient.model';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[];

  constructor (private http: Http) {}

  //get recipes via api call and
  getRecipes(): Observable<any> {
    return this.http.get('http://www.aamirsheriff.com/recipeapi/public/index.php/api/recipes')
    .map(//transforms api returned data into recipe format
      (response: Response) => {
        let data = response.json();
        let apiRecipes: Recipe[] = [];
        let ingrds: Ingredient[] = [];
        for(var recIdx in data)
        {
          for(var x in data[recIdx].ingredients_ary)
          {
            ingrds.push(new Ingredient(
              data[recIdx].ingredients_ary[x].name,
              +data[recIdx].ingredients_ary[x].amount,
              data[recIdx].ingredients_ary[x].measurementUnit
            ));
          }

          apiRecipes.push(new Recipe(
            data[recIdx].recipeId,
            data[recIdx].name,
            data[recIdx].description,
            data[recIdx].url,
            ingrds,
            data[recIdx].instructions));

            ingrds = [];
        }

        //update service recipe ary to data returned from api call
        this.recipes = apiRecipes;

        //returns a copy of the recipe array instead of the array itself
        if(this.recipes === undefined || this.recipes === null)
          return apiRecipes;
        else
          return this.recipes.slice();
      }
    );
  }

  //set js recipe array to the recipes parameter
  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
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
