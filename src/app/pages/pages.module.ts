import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';


import { PagesRoutingModule } from './pages-routing.module';
import { IngredientService } from '../shared/services/ingredient.service';
import { PanierService } from '../shared/services/panier.service';
import { RecipeService } from '../shared/services/recipe.service';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';



@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    MiscellaneousModule,    
  ],providers:[IngredientService, PanierService, RecipeService],
  declarations: [
    PagesComponent,
  ],
})
export class PagesModule {
}
