import { Component, OnInit } from '@angular/core';
import { CharactersComponent } from '../characters/characters.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CharactersComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent{



}
