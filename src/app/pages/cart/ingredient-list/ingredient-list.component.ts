import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../../../shared/models/ingredient.model';
import { PanierService } from '../../../shared/services/panier.service';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-ingredient-list',
  templateUrl: './ingredient-list.component.html',
  styleUrls: ['./ingredient-list.component.scss']
})
export class IngredientListComponent implements OnInit, OnDestroy {

  constructor(private panierService: PanierService,
    private fb: FormBuilder) { }

  public cartForm: FormGroup;

  public ingredients: Ingredient[];
  private subscription: Subscription;



  initForm(){
    let recupIngredients = this.ingredients;

    this.cartForm = this.fb.group(
      {
        ingredients: this.fb.array(
          recupIngredients.map(
            ingredient => this.fb.group({ name: [ingredient.name],
              quantity: [ingredient.quantity],
              unit: [ingredient.unit]})))
        
      });
  }

  ngOnInit() {
    this.subscription = this.panierService.cart.subscribe((ingredients: Ingredient[]) => {
      console.log(ingredients);
      this.ingredients = ingredients;
      this.initForm();
     });
    
    console.log(this.ingredients);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  savePanier(){
    this.panierService.saveCart(this.ingredients); 
  }

  cleanPanier(){
    this.ingredients = [];
    this.savePanier();
  }
}
