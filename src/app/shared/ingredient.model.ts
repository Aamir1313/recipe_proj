export class Ingredient {
  public name: string;
  public amount: number;
  public measurementUnit: string;

  constructor (public ingredientName: string, public ingredientAmount: number, public ingredientMeasurementUnit: string)
  {
    this.name = ingredientName;
    this.amount = ingredientAmount;
    this.measurementUnit = ingredientMeasurementUnit;
  }
}
