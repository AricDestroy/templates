import { Pipe, PipeTransform } from '@angular/core';
import { Recipe } from '../models/recipe.model';
import { IngredientDescription } from '../models/ingredient-description.model';

@Pipe({
  name: 'ingredientFilter'
})
export class IngredientFilterPipe implements PipeTransform {

  transform(ingredients: IngredientDescription[], search: string): IngredientDescription[] | null {
    console.log('seearch' + search);
    console.log(ingredients);
    if (!search) {
      return ingredients;
    } else {
      return ingredients.filter( r => r.name.toLowerCase().includes(search.toLowerCase()));
    }
  }

}
