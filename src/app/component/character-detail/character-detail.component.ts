import { Component, OnInit, inject } from '@angular/core';
import { Result } from '../../model/character.model';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-character-detail',
  standalone: true,
  imports: [],
  templateUrl: './character-detail.component.html',
  styleUrl: './character-detail.component.css',
})
export class CharacterDetailComponent implements OnInit {
  private _apiService = inject(ApiService);
  private _route = inject(ActivatedRoute);

  public character?: Result;
  loading: boolean = true;

  ngOnInit(): void {
    this._route.params.subscribe((params) => {
      this._apiService.getCharacter(params['id']).subscribe((data: Result) => {
        this.character = data;
        this.loading = false;
      });
    });
  }
}
