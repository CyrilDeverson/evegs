import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Article, CatalogueService } from '../catalogue.service';

@Component({
  selector: 'evegs-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  articleForm: FormGroup;
  reference: FormControl;
  libelle: FormControl;

  @Output()
  private ajouterArticle = new EventEmitter<Article>();

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
    this.ajouterArticle.next(this.articleForm.value);

    this.articleForm.reset();
  }

}

export function referenceUnique(catalogueService: CatalogueService): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const article = catalogueService.chercherParReference(control.value);
    return article ? { 'referenceUnique': { value: control.value } } : null;
  };
}
