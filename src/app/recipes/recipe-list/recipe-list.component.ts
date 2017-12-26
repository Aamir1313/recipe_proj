import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { Recipe } from '../../shared/recipe.model';
import { RecipeService } from '../../shared/recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {

  //this ary exists b/c we do not want to directly using recipeservice recipe ary, we use a copy of the js ary
  recipes: Recipe[];
  //used to monitor recipesChanged var
  subscription: Subscription;
  //used to check if api call is done
  recipesLoaded: boolean = false;

  constructor(private recipeService: RecipeService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    //if recipechanged param has changed (trigerred from next) then update recipe list js recipe ary
    this.subscription = this.recipeService.recipesChanged
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipes = recipes;
        }
      );

    this.recipeService.getRecipes()
    .subscribe(
      (apiRecipes: Recipe[]) => {
        this.recipes = apiRecipes;
        this.recipesLoaded = true;
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  addRecipe(){
    this.router.navigate(['new'], {relativeTo: this.route});
  }
}
