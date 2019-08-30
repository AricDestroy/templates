import { Ingredient } from './ingredient.model';
import { Step } from './step.model';

export class cart {
  constructor(
    public id: number,
    public ingredients: Ingredient[] = []) {
    }
}
