import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RecipesContainerComponent } from './recipes-container.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeComponent } from './recipe/recipe.component';
import { RecipeDetailComponent } from './recipe/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipe/recipe-edit/recipe-edit.component';

const routes: Routes = [
  {
    path: '',
    component: RecipesContainerComponent,
    children: [
      { path: '', 
        component: RecipeListComponent, 
      },
      { path: 'new', 
        component: RecipeEditComponent, 
      },
      {
        path: 'details',
        component: RecipeComponent, children : [
          { path: ':index', component: RecipeDetailComponent },
          { path : ':index/edit', component: RecipeEditComponent}]
        
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class RecipeListRoutingModule {
}

