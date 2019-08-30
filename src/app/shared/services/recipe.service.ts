import { Injectable } from '@angular/core';
import { Recipe } from '../models/recipe.model';
import {BehaviorSubject, Observable} from 'rxjs';
import { Ingredient } from '../models/ingredient.model';
import { Step } from '../models/step.model';
import {HttpClient} from '@angular/common/http';
import {filter, map, max} from 'rxjs/operators';

@Injectable()
export class RecipeService {

  public maxId = -1;
  public recipes: BehaviorSubject<Recipe[]> = new BehaviorSubject(null);
  /*public cocktails: BehaviorSubject<Cocktail[]> = new BehaviorSubject([
    new Cocktail('patate saucisse',
    'https://assets.afcdn.com/recipe/20141022/24950_w420h344c1cx1600cy2088.jpg',
    'Des supers patates et des supers saucisses',
    [
      new Ingredient('pommes de terre', 8),
      new Ingredient('saucisse de montpelliar', 4),
      new Ingredient('huile d\'olive', 1),
      new Ingredient('noisette de beurre', 1),
	  new Ingredient('herbes de provence', 1),
      new Ingredient('paprika', 1)
    ], [
      new Step( 'Laver et couper les pommes de terre en cube de bonne taille'),
      new Step( 'Dans un fait-tout,  chauffer un gros filet d\'huile d\'olive un morceau de beurre des herbes de provence et du paprika'),
      new Step( 'Jeter les pommes de terre dans le fait-tout et faire revenir rapidement à feu fort'),
      new Step( 'Déposer les saucisses percées sur le lit de pommes de terre et baisser à feu moyen puis couvrir'),
      new Step( 'Laisser cuire 10 minutes  retirer les saucisses et tourner les pommes de terre légèrement puis redéposer les saucisses'),
      new Step( 'Répéter l\'opération 2 fois supplémentaires'),
      new Step( 'retirer les saucisses les découper en gros rondelles et les remettre avec les pommes de terre mélanger puis finir la cuisson par 10 minutes non couvertes')
	  ])
  ]);*/







  constructor(private http: HttpClient) {
    this.recipesInit();
    //this.http.put('https://recette-4bb46.firebaseio.com/recettes.json', this.cocktails.value).subscribe();
  }

  recipesInit(): void {
    this.http.get('https://recette-4bb46.firebaseio.com/recettes.json')
      .subscribe( (recipes: Recipe[]) => {
        this.recipes.next(recipes);
      });
  }

  getRecipe(id: number): Observable<Recipe> {

    return this.recipes.pipe(
            filter( recipes => recipes != null ), map( recipes => recipes.find(recipe => {
              return recipe.id == id;
            })));
  }


  addRecipe(recipe: Recipe): void {
    let recipes: Recipe[];
    if (!this.recipes.value) {
      recipes = [];
    } else {
      recipes = this.recipes.value.slice();
    }

    if (recipe.steps) {
      recipe.steps.sort((a, b) => {
        if (a.id < b.id) {
          return -1;
        }
        if (a.id > b.id) {
          return 1;
        }
        return 0;
      });
    }
    recipes.push(new Recipe(this.getNewId(), recipe.name, recipe.img, recipe.comment, recipe.duration, recipe.nbperson,
      recipe.ingredients.map(
        ingredient => new Ingredient(ingredient.name, ingredient.quantity, ingredient.unit)),
        recipe.steps.map(
        step => new Step(step.id, step.step)
      )));
    this.recipes.next(recipes);
    this.save();
  }

  getNewId(): number {
    if (this.maxId === -1) {
      for (const recipe of this.recipes.value) {
        if (recipe.id > this.maxId) {
          this.maxId = recipe.id;
        }
      }
    }
    this.maxId++;
    return this.maxId;
  }

  editRecipe(editRecipe: Recipe): void {
    const recipes = this.recipes.value.slice();
    const index = recipes.map( c => c.id ).indexOf(editRecipe.id);
    
    recipes[index] = editRecipe;
    this.recipes.next(recipes);
    this.save();
  }

  save(): void {
    this.http.put('https://recette-4bb46.firebaseio.com/recettes.json', this.recipes.value).subscribe();
  }

}
