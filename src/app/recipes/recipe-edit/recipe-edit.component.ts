import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import { RecipeService } from '../../shared/recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;//used to check if adding new recipe or editing existing recipe
  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private recipeService: RecipeService,
              private router: Router) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.editMode = params['id'] != null;
          this.initiliazeForm();
        }
      );
  }

  initiliazeForm() {
    let recipeName = '';
    let recipeDescription = '';
    let recipeImagePath = '';
    let recipeInstructions = '';
    let recipeIngredients = new FormArray([]);//empty set array set

    if(this.editMode)
    {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeDescription = recipe.description;
      recipeImagePath = recipe.imagePath;
      recipeInstructions = recipe.instructions;

      if(recipe['ingredients'])//if there are ingredients in the recipe
      {
        for(let ingredient of recipe.ingredients)//get(push) the list of ingredients
        {
          recipeIngredients.push(
            //formgroup(whole ingredient) is a group of similar vars (ingredient attributes)
            new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)//positive numbers
              ]),
              'measurementunit': new FormControl(ingredient.measurementunit, Validators.required)
            })
          );
        }
      }
    }

    //reactively tie html form inputs
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'instructions': new FormControl(recipeInstructions, Validators.required),
      'ingredients': recipeIngredients
    });
  }

  onAddIngredient() {
    //angular doesn't know this is going to be a formarray, so we cast it into one
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)]),
        'measurementunit': new FormControl(null, Validators.required)
      })
    );
  }

  onDeleteIngredient(index: number) {
    //cast the ingredients form into a form array and remove the index of the ingredient
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  onSubmit() {
    if(this.editMode) {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    }
    else {
      this.recipeService.addRecipe(this.recipeForm.value);
    }
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }
}
