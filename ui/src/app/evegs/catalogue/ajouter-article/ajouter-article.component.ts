import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Article, CatalogueService } from '../catalogue.service';

@Component({
  selector: 'evegs-ajouter-article',
  templateUrl: './ajouter-article.component.html',
  styleUrls: ['./ajouter-article.component.scss']
})
export class AjouterArticleComponent implements OnInit {

  articleForm: FormGroup;
  reference: FormControl;
  libelle: FormControl;

  @Output() ajouter = new EventEmitter<Article>();

  constructor(private fb: FormBuilder, private catalogueService: CatalogueService) {
    this.reference = fb.control('', [Validators.required, referenceUnique(this.catalogueService)]);
    this.libelle = fb.control('', Validators.required);

    this.articleForm = this.fb.group({
      reference: this.reference,
      libelle: this.libelle
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.ajouter.emit(this.articleForm.value);
  }
}

export function referenceUnique(catalogueService: CatalogueService): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const article = catalogueService.chercherParReference(control.value);
    return article ? {'referenceUnique': {value: control.value}} : null;
  };
}
