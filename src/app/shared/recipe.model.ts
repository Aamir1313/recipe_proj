import { Ingredient } from './ingredient.model';

export class Recipe {
  public recipeId: number;
  public name: string;
  public description: string;
  public imagePath: string;
  public ingredients: Ingredient[];
  public instructions: string;

  constructor(recipeId:number, name: string, description: string, imagePath: string, ingredients: Ingredient[], instructions: string)
  {
    this.recipeId = recipeId;
    this.name = name;
    this.description = description;
    this.imagePath = imagePath;
    this.ingredients = ingredients;
    this.instructions = instructions;
  }
}
