import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogueComponent } from './catalogue/catalogue.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CatalogueService } from './catalogue/catalogue.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [CatalogueComponent],
  exports: [CatalogueComponent],
  providers: [CatalogueService]
})
export class EvegsModule { }
