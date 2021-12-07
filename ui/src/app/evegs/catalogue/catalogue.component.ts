import { Component } from '@angular/core';
import { ColDef, ColumnApi, GridApi, GridReadyEvent, SelectionChangedEvent } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Article, CatalogueService } from './catalogue.service';

@Component({
  selector: 'evegs-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.scss']
})
export class CatalogueComponent {
  gridApi!: GridApi;
  columnApi!: ColumnApi;
  selectedRows: any[] = [];

  defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    resizable: true,
    floatingFilter: false,
    flex: 1
  };

  columnDefs: ColDef[] = [
    { checkboxSelection: true, headerCheckboxSelection: true, width: 66, flex: 0},
    { headerName: 'Référence', field: 'reference' },
    { headerName: 'Libellé', field: 'libelle' }
  ];

  rowData: Observable<Article[]>;

  constructor(private catalogueService: CatalogueService) {
    this.rowData = this.catalogueService.articles.pipe(
      map(data => data.content)
    );
  }

  onGridReady($event: GridReadyEvent) {
    this.gridApi = $event.api;
    this.columnApi = $event.columnApi;
  }

  onSelectionChanged($event: SelectionChangedEvent) {
    this.selectedRows = $event.api.getSelectedRows();

    console.log('Selected rows: ' + this.selectedRows.length);
  }

  supprimer() {
    this.selectedRows.forEach(article => {
      this.catalogueService.supprimer(article.reference);
    });
  }

  ajouterArticle(article: Article) {
    this.catalogueService.ajouter(article);
  }

  get hasSelectedRows(): boolean {
    return (!!!this.gridApi) ? false : this.gridApi.getSelectedRows().length != 0;
  }
}
