import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

@Injectable()
export class CatalogueService {
  DEFAULT_ARTICLE = new Article ('legrand-ref1', 'Prise Courant');

  private articles = new Array<Article>();

  constructor() {
    this.articles.push(this.DEFAULT_ARTICLE);
  }

  ajouter(article: Article): Observable<Article[]> {
    if (this.chercherParReference(article.reference)) {
      return Observable.throw(new Error('La référence \'' + article.reference + '\' existe déjà'));
    }
    console.log('Ajout de l\'article: ' + JSON.stringify(article));
    this.articles.push(article);
    return this.lister();
  }

  chercherParReference(reference: String): Article | undefined {
    return this.articles.find(a => a.reference === reference);
  }

  supprimer(reference: String): Observable<Article[]> {
    console.log('Suppression de l\'article: ' + reference);
    this.articles = this.articles.filter((article, i) => reference !== article.reference);
    return this.lister();
  }

  lister(): Observable<Article[]> {
    return Observable.of(this.articles);
  }
}

export class Article {
  constructor(public reference: String, public libelle: String) {}
}
