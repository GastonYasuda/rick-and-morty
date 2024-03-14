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

  private whatCharacter = new BehaviorSubject<Result[]>([]);

  pageNumber?: any;
  allCharacters?: any[] = [];
  howManyPages?: number;

  //info.pages

  showSetedSearchResult(): Observable<any> {
    return this.whatCharacter.asObservable();
  }

  setSearchResult(showCharacterResult: any) {
    return this.whatCharacter.next(showCharacterResult);
  }

  getAllCharacters() {
    this.getAllCharacterCharacteristic().subscribe((data) => {
      this.howManyPages = data.info.pages;
      if (this.howManyPages) {
        for (let i = 0; i < this.howManyPages; i++) {
          this.pageId(i).subscribe((data) => {
            this.allCharacters?.push(data)
          });
        }
      }
    });
    return this.allCharacters
  }

  getAllCharacterCharacteristic(): Observable<ICharacter> {
    return this._http.get<ICharacter>(`${this.urlBase}`);
  }

  getCharacter(id: number): Observable<Result> {
    return this._http.get<Result>(`${this.urlBase}/${id}`);
  }

  getSearchResult(name: string): Observable<ICharacter> {
    return this._http.get<ICharacter>(`${this.urlBase}/?name=${name}`);
  }

  getSearchResultById(id: number): Observable<ICharacter> {
    return this._http.get<ICharacter>(`${this.urlBase}/${id}`);
  }

  pageId(id: number): Observable<ICharacter> {
    this.pageNumber = this._http.get<ICharacter>(`${this.urlBase}/?page=${id}`);
    return this.pageNumber;
  }
}
