
import { NgModule } from '@angular/core';
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbDatepickerModule, NbIconModule,
  NbInputModule,
  NbRadioModule,
  NbSelectModule,
  NbUserModule,
  NbListModule,
  NbStepperModule,
  NbTabsetModule,
  NbPopoverModule,
} from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { RecipeListRoutingModule } from './recipes-routing.module';
import { RecipesContainerComponent } from './recipes-container.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeComponent } from './recipe/recipe.component';
import { RecipeFilterPipe } from '../../shared/pipes/recipe-filter.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecipeListItemComponent } from './recipe-list-item/recipe-list-item.component';
import { RecipeDetailComponent } from './recipe/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipe/recipe-edit/recipe-edit.component';
import { AutocompleteComponent } from '../../shared/components/autocomplete/autocomplete.component';
import { AutocompleteModule } from '../../shared/modules/autocomplete.module';
import { IngredientFilterPipe } from '../../shared/pipes/ingredient-filter.pipe';
import { UnitFilterPipe } from '../../shared/pipes/unit-filter.pipe';


@NgModule({
  imports: [FormsModule,
    ReactiveFormsModule,
    ThemeModule,
    NbInputModule,
    NbCardModule,
    NbButtonModule,
    NbActionsModule,
    NbUserModule,
    NbCheckboxModule,
    NbRadioModule,
    NbDatepickerModule,
    RecipeListRoutingModule,
    NbSelectModule,
    NbIconModule,
    NbListModule,
    NbStepperModule,
    NbTabsetModule,
    NbPopoverModule,
    NbSelectModule,
    AutocompleteModule,
    ],
  declarations: [
    RecipeListComponent,
    RecipeListItemComponent,
    RecipeDetailComponent,
    RecipeEditComponent,
    RecipesContainerComponent,
    RecipeComponent,
    RecipeFilterPipe,
    IngredientFilterPipe,
    UnitFilterPipe
  ],
})
export class RecipesModule { }
