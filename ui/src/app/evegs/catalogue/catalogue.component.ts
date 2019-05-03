import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CatalogueService, Article } from './catalogue.service';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, NgForm } from '@angular/forms';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { timeout } from 'q';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.scss']
})
export class CatalogueComponent implements OnInit, AfterViewInit {

//  @ViewChild('formDirective') private formDirective: NgForm;
  articleForm: FormGroup;

  displayedColumns = ['reference', 'libelle', 'action'];
  dataSource: MatTableDataSource<Article> = new MatTableDataSource<Article>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private fb: FormBuilder, private catalogueService: CatalogueService) {
  }

  ngOnInit() {
    this.articleForm = this.fb.group({
      reference: ['', [Validators.required, referenceUnique(this.catalogueService)]],
      libelle: ['', Validators.required]
    });
    this.catalogueService.articles.subscribe(articles => this.dataSource.data = articles);
  }

  onSubmit() {
    this.ajouterArticle(this.articleForm.value);

//    this.formDirective.resetForm();
  }

  ajouterArticle(article: Article) {
    this.catalogueService.ajouter(article);
  }

  supprimerArticle(reference: String) {
    this.catalogueService.supprimer(reference);
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
