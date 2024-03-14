import { Component, OnInit } from '@angular/core';
import { CharactersComponent } from '../characters/characters.component';
import { SpeciesComponent } from '../species/species.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CharactersComponent, SpeciesComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
