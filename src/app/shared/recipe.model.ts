import { Ingredient } from './ingredient.model';

export class Recipe {
  public recipeId: number;
  public name: string;
  public description: string;
  public imagePath: string;
  public ingredients: Ingredient[];
  public instructions: string;

  constructor(recipeId:number, recipeName: string, recipeDescription: string, recipeImagePath: string, recipeIngredients: Ingredient[], recipeInstructions: string)
  {
    this.recipeId = recipeId;
    this.name = recipeName;
    this.description = recipeDescription;
    this.imagePath = recipeImagePath;
    this.ingredients = recipeIngredients;
    this.instructions = recipeInstructions;
  }
}
