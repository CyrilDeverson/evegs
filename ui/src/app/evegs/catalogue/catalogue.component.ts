import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CatalogueService, Article } from './catalogue.service';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.sass']
})
export class CatalogueComponent implements OnInit, AfterViewInit {

  articleForm: FormGroup;

  private articles: Article[];

  displayedColumns = ['reference', 'libelle', 'action'];
  dataSource: MatTableDataSource<Article> = new MatTableDataSource<Article>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private fb: FormBuilder, private catalogueService: CatalogueService) {
    this.initForm();
  }

  initForm() {
    this.articleForm = this.fb.group({
      reference: ['', [Validators.required, referenceUnique(this.catalogueService)]],
      libelle: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.listerArticles();
  }

  setArticles(articles: Article[]) {
    this.articles = articles;
    this.dataSource.data = articles;
  }

  ajouterArticle(article: Article) {
    this.catalogueService.ajouter(article).subscribe(
      articles => this.setArticles(articles),
      error => console.log(error)
    );

    this.initForm();
  }

  supprimerArticle(reference: String) {
    this.catalogueService.supprimer(reference).subscribe(articles => this.setArticles(articles));
  }

  listerArticles() {
    this.catalogueService.lister().subscribe(articles => this.setArticles(articles));
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
}

export function referenceUnique(catalogueService: CatalogueService): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {
    const article = catalogueService.chercherParReference(control.value);
    return article ? {'referenceUnique': {value: control.value}} : null;
  };
}
