import {
  Component,
  EventEmitter,
  Input,
  Output,
  inject,
  input,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { ICharacter, Result } from '../../model/character.model';
import { Router, RouterLink } from '@angular/router';
import { SearchResultComponent } from '../search-result/search-result.component';

@Component({
  selector: 'app-search-character',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, SearchResultComponent],
  templateUrl: './search-character.component.html',
  styleUrl: './search-character.component.css',
})
export class SearchCharacterComponent {
  @Output() sendAllSearchResults = new EventEmitter<Result[]>();
  @Output() sendCharacterResults = new EventEmitter<Result>();

  private _apiService = inject(ApiService);
  nuevo?: string[];

  searchCharacter!: FormGroup;
  searchInputValue?: string | number;
  allCharacterResult?: Result[];
  characterResult?: Result;

  constructor(private formBuilder: FormBuilder) {
    this.searchCharacter = this.formBuilder.group({
      searchInput: ['', Validators.required],
    });
  }

  searchResultMethod(event: Event) {
    event.preventDefault();

    this._apiService.setSearchResult('');

    this.searchInputValue = isNaN(this.searchCharacter.value['searchInput'])
      ? this.searchCharacter.value['searchInput']
      : parseFloat(this.searchCharacter.value['searchInput']);
    this.searchCharacter.value['searchInput'];

    if (typeof this.searchInputValue === 'string') {
      this._apiService
        .getSearchResult(this.searchInputValue)
        .subscribe((data: ICharacter) => {
          console.log(data.results);
          this._apiService.setSearchResult(data.results);
        });
    } else if (typeof this.searchInputValue === 'number') {
      this._apiService
        .getSearchResultById(this.searchInputValue)
        .subscribe((data: ICharacter) => {
          console.log(data);
          this._apiService.setSearchResult(data);
        });

    }
  }
}
