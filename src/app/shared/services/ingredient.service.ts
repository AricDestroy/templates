import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {filter, map, max} from 'rxjs/operators';
import { IngredientDescription } from '../models/ingredient-description.model';
import { Ingredient } from '../models/ingredient.model';
import { Unit } from '../models/unit.model';


@Injectable()
export class IngredientService {

  public maxId = -1;
  public ingredients: BehaviorSubject<IngredientDescription[]> = new BehaviorSubject(null);
  public units: BehaviorSubject<Unit[]> = new BehaviorSubject(null);

  constructor(private http: HttpClient) {
    this.initIngredients();
    this.initUnits();
    console.log('ingredient service init');
  }

  initUnits(): void {
    this.http.get('https://recette-4bb46.firebaseio.com/units.json')
    .subscribe( (units: Unit[]) => {
      this.units.next(units);
    });
  }

  initIngredients(): void {
    this.http.get('https://recette-4bb46.firebaseio.com/ingredients.json')
      .subscribe( (ingredients: IngredientDescription[]) => {
        this.ingredients.next(ingredients);
      });
  }

  updateReferences(ingredients: Ingredient[]) {
    const ingredientsReference = this.ingredients.value.slice();
    const unitsReference = this.units.value.slice();


    ingredients.map(ingredient => {
      console.log(ingredient.name);
      const ingredientDescription = ingredientsReference.find(ingredientR => {
        return ingredientR.name === ingredient.name;
      });
      if ((!ingredientDescription) && (ingredient.name && ingredient.name.length > 0)) {
        ingredientsReference.push({name : ingredient.name});
      }

      const unitReference = unitsReference.find(unitR => {
        return unitR.name === ingredient.unit;
      });
      if ((!unitReference) && (ingredient.unit && ingredient.unit.length > 0)) {
        unitsReference.push({name : ingredient.unit});
      }
    });

    this.ingredients.next(ingredientsReference);
    this.saveIngredients();

    this.units.next(unitsReference);
    this.saveUnits();
  }

  saveIngredients(): void {
    this.http.put('https://recette-4bb46.firebaseio.com/ingredients.json', this.ingredients.value).subscribe();
  }

  saveUnits(): void {
    this.http.put('https://recette-4bb46.firebaseio.com/units.json', this.units.value).subscribe();
  }

}
