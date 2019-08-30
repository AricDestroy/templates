import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IngredientListComponent } from './ingredient-list/ingredient-list.component';
import { CartComponent } from './cart.component';
import { RouterModule, Routes } from '@angular/router';
import { NbIconModule, NbListModule, NbCardModule, NbCheckboxModule, NbButtonModule } from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [{
  path: '',
  component: CartComponent}
]

@NgModule({
  declarations: [IngredientListComponent, CartComponent],
  imports: [FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NbIconModule,
    NbListModule,
    NbCardModule,
    NbButtonModule,
    NbCheckboxModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]  
})
export class CartModule { }
