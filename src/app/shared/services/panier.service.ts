import { Injectable } from '@angular/core';
import { Ingredient } from '../models/ingredient.model';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PanierService {

  public cart: BehaviorSubject<Ingredient[]> = new BehaviorSubject<Ingredient[]>(null);

  private cartJsonUrl = 'https://recette-4bb46.firebaseio.com/cart.json';
  constructor(private http: HttpClient) { 
    this.initCart();
  }

  initCart(): void {
    this.http.get(this.cartJsonUrl)
      .subscribe( (cart: Ingredient[]) => {
        this.cart.next(cart);
      });
  }

  addIngredients(ingredients: Ingredient[], divisor: number): void {
    let currentValue: Ingredient[] = [];

    if (this.cart.value) {
      currentValue = this.cart.value.slice();
    }

    for (const ingredient of ingredients) {
        console.log(ingredient.name);
        const ing =  currentValue.find(ingred => (ingred.name === ingredient.name && ingred.unit === ingredient.unit));
        if (ing) {
          ing.quantity += ingredient.quantity * divisor;
        } else {
          currentValue.push(new Ingredient(ingredient.name, ingredient.quantity * divisor, ingredient.unit, true));
        }
      }
    this.cart.next(currentValue);
    }
    
    saveCart(cart : Ingredient[]): void {
      this.http.put(this.cartJsonUrl, cart).subscribe(res => console.log(res));
    }

}

