
import { Observable, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export class Article {
  constructor(public id: String, public reference: String, public libelle: String) {}
}

export class Page<T> {
  constructor(public content: Article[], public totalElements: number) {}
}


@Injectable({
  providedIn: 'root'
})
export class CatalogueService {
  private _articles = new BehaviorSubject<Page<Article>>(new Page([], 1));

  constructor(private http: HttpClient) {
    this.loadArticles();
  }

  findArticles(): Observable<Page<Article>> {
    return this.http.get<Page<Article>>('/articles');
  }

  loadArticles() {
    this.findArticles().subscribe(
      (articles: Page<Article>) => this._articles.next(articles)
    );
  }

  ajouter(article: Article) {
    if (this.chercherParReference(article.reference)) {
      throw new Error('La référence \'' + article.reference + '\' existe déjà');
    }
    console.log('Ajout de l\'article: ' + JSON.stringify(article));
//    this._articles.next(new Page([...this._articles.getValue().content, article], this._articles.getValue().totalElements+1));
    this.http.post<Article>('/articles', article).subscribe((article) => this._articles.next(new Page([...this._articles.getValue().content, article], this._articles.getValue().totalElements+1)));
  }

  chercherParReference(reference: String): Article | undefined {
    return this._articles.getValue().content.find(a => a.reference === reference);
  }

  supprimer(reference: String) {
    console.log('Suppression de l\'article: ' + reference);
    this.http.delete(`/articles/${reference}`).subscribe(resullt => {
      let result: Article[] = this._articles.getValue().content.filter((article, i) => reference !== article.reference);
      this._articles.next(new Page(result, result.length));
    });
  }

  get articles(): Observable<Page<Article>> {
    return this._articles;
  }
}
