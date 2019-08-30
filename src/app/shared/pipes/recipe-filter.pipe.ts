import { Pipe, PipeTransform } from '@angular/core';
import { Recipe } from '../models/recipe.model';

@Pipe({
  name: 'recipeFilter'
})
export class RecipeFilterPipe implements PipeTransform {

  transform(recipes: Recipe[], search: string): Recipe[] | null {
    if (!search) {
      return recipes;
    } else {
      return recipes.filter( r => r.name.toLowerCase().includes(search.toLowerCase()));
    }
  }

}
