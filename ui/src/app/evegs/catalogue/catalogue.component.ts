import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CatalogueService, Article } from './catalogue.service';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, NgForm, ValidationErrors, FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { timeout } from 'q';

@Component({
  selector: 'evegs-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.scss']
})
export class CatalogueComponent implements OnInit, AfterViewInit {

  articleForm: FormGroup;
  reference: FormControl;
  libelle: FormControl;

  displayedColumns = ['reference', 'libelle', 'action'];
  dataSource: MatTableDataSource<Article> = new MatTableDataSource<Article>();

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator|null = null;
  @ViewChild(MatSort, { static: false }) sort: MatSort | null = null;

  constructor(private fb: FormBuilder, private catalogueService: CatalogueService) {
    this.reference = fb.control('', [Validators.required, referenceUnique(this.catalogueService)]);
    this.libelle = fb.control('', Validators.required);

    this.articleForm = this.fb.group({
      reference: this.reference,
      libelle: this.libelle
    });
  }

  ngOnInit() {
    this.catalogueService.articles.subscribe(articles => this.dataSource.data = articles);
  }

  onSubmit() {
    this.ajouterArticle(this.articleForm.value);

    this.articleForm.reset();
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
  return (control: AbstractControl): ValidationErrors | null => {
    const article = catalogueService.chercherParReference(control.value);
    return article ? {'referenceUnique': {value: control.value}} : null;
  };
}
