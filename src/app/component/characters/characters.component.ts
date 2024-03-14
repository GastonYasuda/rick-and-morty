import { Component, Input, OnInit, inject } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Result } from '../../model/character.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-characters',
  standalone: true,
  imports: [],
  templateUrl: './characters.component.html',
  styleUrl: './characters.component.css',
})
export class CharactersComponent implements OnInit {

  allCharacterPages?: Result[] = [];

  pageNumber: number = 1;
  howManyPages: number = 0;
  nextPage: number = this.pageNumber;
  private _apiService = inject(ApiService);
  private _router = inject(Router);

  ngOnInit(): void {
    this._apiService.pageId(this.pageNumber).subscribe((data) => {
      this.allCharacterPages = data.results;
      this.howManyPages = data.info.pages;
    });     
  }

  seeLessCharacters() {
    this.pageNumber !== 1 && this.pageNumber--;
    this._apiService.pageId(this.pageNumber).subscribe((data) => {
      this.allCharacterPages = data.results;
    });
  }

  seeMoreCharacters() {
    this.pageNumber < this.howManyPages && this.pageNumber++;
    this._apiService.pageId(this.pageNumber).subscribe((data) => {
      this.allCharacterPages = data.results;
    });
  }

  navigate(id: number) {
    this._router.navigate(['/characters', id]);
  }
}
