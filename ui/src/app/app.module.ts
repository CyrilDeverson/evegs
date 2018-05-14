import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { EvegsModule } from './evegs/evegs.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    EvegsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
