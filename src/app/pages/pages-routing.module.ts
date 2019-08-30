import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'recipes',
      loadChildren: () => import('./recipes/recipes.module')
        .then(m => m.RecipesModule),
    },{
      path: 'cart',
      loadChildren: () => import('./cart/cart.module')
        .then(m => m.CartModule),
    },
    {
      path: '',
      redirectTo: 'recipes',
      pathMatch: 'full',
    },
    {
      path: '**',
      component: NotFoundComponent,
    }
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
