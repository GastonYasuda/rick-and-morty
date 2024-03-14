import { Component, Input, OnInit, inject } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Result } from '../../model/character.model';

@Component({
  selector: 'app-species',
  standalone: true,
  imports: [],
  templateUrl: './species.component.html',
  styleUrl: './species.component.css',
})
export class SpeciesComponent implements OnInit {
  @Input() characteristic?: string;
  private _apiService = inject(ApiService);


  searchSpecie?: Result[] = [];
  allcharacter?: any[];
  speciesType = new Set<string>();

  transform(value: Set<any>): any[] {
    return Array.from(value);
  }

  ngOnInit(): void {
 //   console.log(this.characteristic);

    this.allcharacter = this._apiService.getAllCharacters();

    if (this.allcharacter !== undefined) {
      for (const eachCharacter of this.allcharacter) {
        for (const character of eachCharacter.results) {
          this.speciesType.add(character[`${this.characteristic}`]);
        }
      }
    }

    this.transform(this.speciesType);
  }

  searchByCharacteristic(specie: string) {
    this.searchSpecie = [];

    if (this.allcharacter !== undefined) {
      for (const eachCharacter of this.allcharacter) {
        for (const character of eachCharacter.results) {
          if (character[`${this.characteristic}`] === specie) {
            this.searchSpecie?.push(character);
          }
        }
      }
    }
  }
}
