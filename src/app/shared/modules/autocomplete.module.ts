import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutocompleteComponent } from '../components/autocomplete/autocomplete.component';
import { AutocompleteDirective } from '../directives/autocomplete.directive';
import { AutocompleteContentDirective } from '../directives/autocomplete-content.directive';
import { OptionComponent } from '../components/option/option.component';

const publicApi = [
  AutocompleteComponent,
  AutocompleteDirective,
  AutocompleteContentDirective,
  OptionComponent
];

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [publicApi],
  exports: [publicApi]
})
export class AutocompleteModule {
}
