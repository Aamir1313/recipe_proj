import { Component, OnInit } from '@angular/core';

import { Recipe } from '../shared/recipe.model';
import { RecipeService } from '../shared/recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  //this ary exists b/c we do not want to directly using recipeservice recipe ary, we use a copy of the js ary
  recipes: Recipe[];
  recipesLoaded: boolean = false;

  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
    this.recipeService.getRecipes()
    .subscribe(
      (apiRecipes: Recipe[]) => {
        this.recipes = apiRecipes;
        this.recipesLoaded = true;
        console.log('get recipes response');
        console.log(this.recipes);
      },
      (error) => {console.log('get recipes errors happened' + error)},
      () => {console.log('get recipes completed')}
    );
  }
}
