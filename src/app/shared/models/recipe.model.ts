import { Ingredient } from './ingredient.model';
import { Step } from './step.model';

export class Recipe {
  constructor(
    public id: number,
    public name: string,
    public img: string,
    public comment: string,
    public duration: number,
    public nbperson: number,
    public ingredients: Ingredient[] = [],
    public steps: Step[] = []) {
    }
}
