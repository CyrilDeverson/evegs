import {of as observableOf, throwError as observableThrowError,  Observable, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export class Article {
  constructor(public id: number, public reference: String, public libelle: String) {}
}
export class Page<T> {
  constructor(public content: T[]) {} 
}

@Injectable({
  providedIn: 'root'
})
export class CatalogueService {
  private static readonly DEFAULT_ARTICLE = new Article(1, 'legrand-ref1', 'Prise Courant');

  private _articles = new BehaviorSubject<Article[]>([]);

  constructor(private http: HttpClient) {
    this.update();
  }

  ajouter(article: Article) {
    this.http.post("/articles", article).subscribe(
      next => console.log('Article créé!'),
      error => console.error('Article non créé: ' + error)
    );
    if (this.chercherParReference(article.reference)) {
      throw new Error('La référence \'' + article.reference + '\' existe déjà');
    }
    console.log('Ajout de l\'article: ' + JSON.stringify(article));
    this._articles.next([...this._articles.getValue(), article]);
  }

  chercherParReference(reference: String): Article | undefined {
    return this._articles.getValue().find(a => a.reference === reference);
  }

  supprimer(id: number) {
    console.log('Suppression de l\'article: ' + id);
    this.http.delete("/articles/" + id).subscribe(
      next => console.log('Article supprimé!'),
      error => console.error('Article non supprimé: ' + error)
    );
    this._articles.next(this._articles.getValue().filter((article, i) => id !== article.id));
  }

  get articles(): Observable<Article[]> {
    return this._articles;
  }

  private update() {
    return this.http.get<Page<Article>>("/articles").subscribe(next => this._articles.next(next.content));
  }
}
