import { Component } from '@angular/core';
import { RecipeService } from '../../../shared/services/recipe.service';
import { Recipe } from '../../../shared/models/recipe.model';
import { RecipeFilterPipe } from '../../../shared/pipes/recipe-filter.pipe';

@Component({
  selector: 'ngx-recipe-list',
  styleUrls: ['./recipe-list.component.scss'],
  templateUrl: './recipe-list.component.html',
  providers: [RecipeFilterPipe]
})
export class RecipeListComponent {

  starRate = 2;
  heartRate = 4;
  radioGroupValue = 'This is value 2';

  search = '';
  recipes: Recipe[];
  activeRecipe: number;

  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
    this.recipeService.recipes.subscribe( (recipes: Recipe[]) => {
      this.recipes = recipes;
    });
  }
}
