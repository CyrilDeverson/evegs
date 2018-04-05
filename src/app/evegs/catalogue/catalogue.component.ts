import { Component, OnInit } from '@angular/core';
import { CatalogueService, Article } from './catalogue.service';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.sass']
})
export class CatalogueComponent implements OnInit {

  private articleForm: FormGroup;

  private articles: Article[];

  constructor(private fb: FormBuilder, private catalogueService: CatalogueService) {
    this.articleForm = this.fb.group({
      reference: ['', [Validators.required, referenceUnique(catalogueService)]],
      libelle: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.listerArticles();
  }

  ajouterArticle(article: Article) {
    this.catalogueService.ajouter(article).subscribe(
      articles => this.articles = articles,
      error => console.log(error));

      this.articleForm.reset();
  }

  supprimerArticle(index: number) {
    this.catalogueService.supprimer(index).subscribe(articles => this.articles = articles);
  }

  listerArticles() {
    this.catalogueService.lister().subscribe(articles => this.articles = articles);
  }
}

export function referenceUnique(catalogueService: CatalogueService): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {
    const forbidden = catalogueService.chercherParReference(control.value);
    return forbidden ? {'referenceUnique': {value: control.value}} : null;
  };
}
