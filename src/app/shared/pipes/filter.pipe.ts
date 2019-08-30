import { Pipe, PipeTransform } from '@angular/core';
import { Recipe } from '../models/recipe.model';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(recipes: Recipe[], search: string): Recipe[] | null {
    if (!search) {
      return recipes;
    } else {
      return recipes.filter( r => r.name.toLowerCase().includes(search.toLowerCase()));
    }
  }

}
