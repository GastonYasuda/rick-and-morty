import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ICharacter, Info, Result } from '../model/character.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private _http = inject(HttpClient);
  private urlBase: string = 'https://rickandmortyapi.com/api/character';

  searchAllCharacter?: ICharacter;
  consulta: any;
  pages: any;

  private whatCharacter = new BehaviorSubject<Result[]>([]);

  showSetedSearchResult(): Observable<any> {
    return this.whatCharacter.asObservable();
  }

  setSearchResult(showCharacterResult: any) {
    // Haz algo con los resultados, por ejemplo, mostrarlos en la consola
    return this.whatCharacter.next(showCharacterResult);
  }

  getAllCharacters(): Observable<ICharacter> {
    return this._http.get<ICharacter>(this.urlBase);
  }
  getCharacter(id: number): Observable<Result> {
    return this._http.get<Result>(`${this.urlBase}/${id}`);
  }

  getCharacterBySearch(name: string): Observable<ICharacter> {
    return this._http.get<ICharacter>(`${this.urlBase}/?name=${name}`);
  }

  getSearchResult(name: string): Observable<ICharacter> {
    this.consulta = this._http.get<ICharacter>(`${this.urlBase}/?name=${name}`);
    return this.consulta;
  }

  getSearchResultById(id: number): Observable<ICharacter> {
    this.consulta = this._http.get<ICharacter>(`${this.urlBase}/${id}`);
    return this.consulta;
  }

  pageId(id: number): Observable<ICharacter> {
    this.pages = this._http.get<ICharacter>(`${this.urlBase}/?page=${id}`);
    return this.pages;
  }
}
