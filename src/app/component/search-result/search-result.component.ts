import { Component, Inject, Input, OnInit, inject } from '@angular/core';
import { ICharacter, Result } from '../../model/character.model';
import { SearchCharacterComponent } from '../search-character/search-character.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-search-result',
  standalone: true,
  imports: [RouterLink, SearchCharacterComponent, SearchResultComponent],
  templateUrl: './search-result.component.html',
  styleUrl: './search-result.component.css',
})
export class SearchResultComponent implements OnInit {


  reciveAllSearchResults?: Result[];
  reciveCharacterResult?: Result;

  private _apiService = inject(ApiService);

  todosLosResultados?: Result[] = [];
  resultadoId?: Result;
  byString?: boolean = false;

  ngOnInit(): void {
    this.todosLosResultados = [];


    this._apiService.showSetedSearchResult().subscribe((answer: Result[]) => {
      if (answer.length > 0) {
        this.todosLosResultados = answer;
        this.byString = true;
      } else {
        this._apiService.showSetedSearchResult().subscribe((answer: Result) => {
          console.log('resultadoId', answer);
          this.resultadoId = answer;
        });
        this.byString = false;
      }
    });
  }

  recivedAllSearchResults(allResults: Result[]) {
    this.reciveAllSearchResults = allResults;
  }

  recivedCharacterResult(idResult: Result) {
    this.reciveCharacterResult = idResult;
  }
}
