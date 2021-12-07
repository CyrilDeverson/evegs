import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ColDef } from 'ag-grid-community';
import { Article, CatalogueService } from './catalogue.service';

@Component({
  selector: 'evegs-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.scss']
})
export class CatalogueComponent implements OnInit, AfterViewInit {

  displayedColumns = ['reference', 'libelle', 'action'];
  dataSource: MatTableDataSource<Article> = new MatTableDataSource<Article>();

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator | null = null;
  @ViewChild(MatSort, { static: false }) sort: MatSort | null = null;

  columnDefs: ColDef[] = [
    { field: 'reference', headerName: 'Référence', editable: true },
    { field: 'label', headerName: 'Libellé' },
    { field: 'action', headerName: 'Action' }
  ];

  rowData = [
    { reference: 'Toyota', label: 'Celica', action: 35000 },
    { reference: 'Ford', label: 'Mondeo', action: 32000 },
    { reference: 'Porsche', label: 'Boxter', action: 72000 }
  ];

  defaultColDef: ColDef = {
    flex: 1,
    sortable: true,
    onCellValueChanged: this.cellValueChanged
  }

  constructor(private catalogueService: CatalogueService) {
  }

  ngOnInit() {
    this.catalogueService.articles.subscribe(articles => this.dataSource.data = articles);
  }

  ajouterArticle(article: Article) {
    this.catalogueService.ajouter(article);
  }

  supprimerArticle(id: number) {
    this.catalogueService.supprimer(id);
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

  cellValueChanged(params: ValueChangedEvent) {
    alert("params.data: " + JSON.stringify(params.data) + ", params.newValue" + params.newValue);
  }
}

class ValueChangedEvent {
    data: any;
    oldValue: any;
    newValue: any;
}
