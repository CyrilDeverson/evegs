
import {of as observableOf, throwError as observableThrowError,  Observable, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

export class Article {
  constructor(public reference: String, public libelle: String) {}
}

@Injectable({
  providedIn: 'root'
})
export class CatalogueService {
  private static readonly DEFAULT_ARTICLE = new Article('legrand-ref1', 'Prise Courant');

  private _articles = new BehaviorSubject<Article[]>([CatalogueService.DEFAULT_ARTICLE]);

  ajouter(article: Article) {
    if (this.chercherParReference(article.reference)) {
      return observableThrowError(new Error('La référence \'' + article.reference + '\' existe déjà'));
    }
    console.log('Ajout de l\'article: ' + JSON.stringify(article));
    this._articles.next([...this._articles.getValue(), article]);
  }

  chercherParReference(reference: String): Article | undefined {
    return this._articles.getValue().find(a => a.reference === reference);
  }

  supprimer(reference: String) {
    console.log('Suppression de l\'article: ' + reference);
    this._articles.next(this._articles.getValue().filter((article, i) => reference !== article.reference));
  }

  get articles(): Observable<Article[]> {
    return this._articles;
  }
}
