import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Recipe } from '../../../../shared/models/recipe.model';
import { Ingredient } from '../../../../shared/models/ingredient.model';
import { RecipeService} from '../../../../shared/services/recipe.service';
import { PanierService } from '../../../../shared/services/panier.service';
import { ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormBuilder, FormControl} from '@angular/forms';


@Component({
  selector: 'ngx-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  index = 0;

  nbperson: number;
  nbPersonFormControl = new FormControl();
  public panierForm: FormGroup;

  public persons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  constructor(private activatedRoute: ActivatedRoute,
              private fb: FormBuilder,
              private recipeService: RecipeService,
              private panierService: PanierService,
              private sanitizater: DomSanitizer) {
                
               }


  ngOnInit() {

    this.activatedRoute.params.subscribe((params: Params) => {
      if (params.index) {
        this.index = params.index;
      }
    });


    this.recipeService.getRecipe(this.index).subscribe( (recipe: Recipe) => {
      this.recipe = recipe;
    });

    this.initForm();
  }

  getDivisor(): number {

    let divisor = this.recipe.nbperson;
    if (this.nbPersonFormControl.value > 0) {
      divisor = this.nbPersonFormControl.value;
    }
    
    return divisor / this.recipe.nbperson;
  }

  addPanier(ingredients: Ingredient[]): void {

    this.panierService.addIngredients(ingredients.slice(), this.getDivisor() / this.recipe.nbperson);
  }

  

  getImageUrl() {
    return this.sanitizater.bypassSecurityTrustStyle(`url(${this.recipe.img})`);
  }

  initForm(recipe = { id: 0, name: '', img: '', comment: '', duration: 0, nbperson: 0, ingredients: [], steps: []}) {

    this.nbPersonFormControl.setValue(2);
  }

}
