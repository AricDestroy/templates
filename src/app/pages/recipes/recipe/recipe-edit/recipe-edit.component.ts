import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Recipe } from '../../../../shared/models/recipe.model';
import { Ingredient } from '../../../../shared/models/ingredient.model';
import { RecipeService} from '../../../../shared/services/recipe.service';
import { PanierService } from '../../../../shared/services/panier.service';
import { ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray} from '@angular/forms';
import { IngredientDescription } from '../../../../shared/models/ingredient-description.model';
import { IngredientService } from '../../../../shared/services/ingredient.service';
import { Unit } from '../../../../shared/models/unit.model';

@Component({
  selector: 'ngx-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit {
  public recipeForm: FormGroup;
  public recipe: Recipe;
  private edit: boolean;

  index = 0;
  
  ingredientsList: IngredientDescription[] = [];
  unitsList: Unit[] = [];
  nbperson: number;

  private maxStepId = 0;

 

  public persons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  constructor(private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private recipeService: RecipeService,
    private sanitizater: DomSanitizer,
    private ingredientService: IngredientService) {
      
     }

  ngOnInit() {
    this.ingredientService.ingredients.subscribe( (ingredients: IngredientDescription[]) => {
      this.ingredientsList = ingredients;
    });

    this.ingredientService.units.subscribe( (units: Unit[]) => {
      this.unitsList = units;
    });
    this.activatedRoute.params.subscribe((params: Params) => {
      if (params.index) {
        this.index = params.index;
      }
    });



    this.activatedRoute.params.subscribe(( params: Params ) => {
      if (params.index) {
        this.edit = true;
        this.recipeService.getRecipe(params.index).subscribe( (recipe: Recipe) => {
          this.recipe = recipe;
          this.initForm(this.recipe);
        });
      } else {
        this.edit = false;
        this.initForm();
      }
    });
  }


  addPanier(ingredients: Ingredient[]): void {

    //this.panierService.addIngredients(ingredients.slice(), this.getDivisor() / this.recipe.nbperson);
  }

  getUrl() {
    return ['/recipes', this.index, 'edit'];
  }

  getImageUrl() {
    return this.sanitizater.bypassSecurityTrustStyle(`url(${this.recipe.img})`);
  }

  initForm(recipe = { id: 0, name: '', img: '', comment: '', duration: 0, nbperson: 0, ingredients: [], steps: []}) {
    let recupIngredients = [];
    if (recipe.ingredients) {
      recupIngredients = recipe.ingredients.slice();
    }

    let recupStep = [];
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
      recupStep = recipe.steps.slice();

      for (const step of recupStep) {
        if (step.id > this.maxStepId) {
          this.maxStepId = step.id;
        }
      }
    }

    this.recipeForm = this.fb.group(
      {
        id: [recipe.id],
        name: [recipe.name, Validators.required],
        img: [recipe.img, Validators.required],
        comment: [recipe.comment],
        duration: [recipe.duration],
        nbperson: [recipe.nbperson],
        ingredients: this.fb.array(
          recupIngredients.map(
            ingredient => this.fb.group({ name: [ingredient.name],
              quantity: [ingredient.quantity],
              unit: [ingredient.unit]}))),
        steps: this.fb.array(
          recupStep.map(
            step => this.fb.group({ id :new FormControl({value: [step.id], disabled: true}),
              step: [step.step]})
          )
        )
      });

    
  }

  addIngredient(): void {
    (this.recipeForm.get('ingredients') as FormArray).push(this.fb.group({
      name: [''],
      quantity: [],
      unit: ['']
    }));
  }


  addStep(): void {
    (this.recipeForm.get('steps') as FormArray).push(this.fb.group({
      id: new FormControl({value: [this.maxStepId + 1], disabled: true}),
      step: ['']
    }));
  }

  saveRecipe() {
    if (this.edit) {
      this.recipeService.editRecipe(this.recipeForm.value);
      this.ingredientService.updateReferences(this.recipeForm.value.ingredients);
    } else {
      this.recipeService.addRecipe(this.recipeForm.value);
      this.ingredientService.updateReferences(this.recipeForm.value.ingredients);
    }
  }

}
