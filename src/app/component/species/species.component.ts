import { Component, OnInit, inject } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ICharacter, Result } from '../../model/character.model';
import { log } from 'console';

@Component({
  selector: 'app-species',
  standalone: true,
  imports: [],
  templateUrl: './species.component.html',
  styleUrl: './species.component.css',
})
export class SpeciesComponent implements OnInit {
  private _apiService = inject(ApiService);

  searchSpecie?: Result[] = [];
  whatSpecie?: Result[];
  seeHuman: boolean = false;
  allcharacter?: any[];
  speciesType = new Set<string>();

  transform(value: Set<any>): any[] {
    return Array.from(value);
  }

  ngOnInit(): void {
    this._apiService
      .getAllCharacterCharacteristic()
      .subscribe((data: ICharacter) => {
        this.whatSpecie = data.results;
      });
    this.allcharacter = this._apiService.getAllCharacters();
    //   console.log(this.allcharacter);

    if (this.allcharacter !== undefined) {
      for (const eachCharacter of this.allcharacter) {
        for (const character of eachCharacter.results) {
          this.speciesType.add(character.species);
        }
      }
    }
    
    this.transform(this.speciesType)
  }

  searchByCharacteristic(specie: string) {
    this.searchSpecie = [];
    //console.log(this.allcharacter);

    if (this.allcharacter !== undefined) {
      //  console.log(this.allcharacter);

      for (const eachCharacter of this.allcharacter) {
        for (const character of eachCharacter.results) {
          if (character.species === specie) {
            //console.log(character.species);
            this.searchSpecie?.push(character);
          }
        }
      }

      if (specie === 'Human') {
        this.seeHuman = true;
      } else {
        this.seeHuman = false;
      }
    }
  }
}
