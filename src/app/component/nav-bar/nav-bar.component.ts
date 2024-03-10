import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { SearchCharacterComponent } from '../search-character/search-character.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [NgClass, RouterLink, SearchCharacterComponent],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent {
  menuOption: string = '';
  onOption(menuOption: string) {
    this.menuOption = menuOption;
  }
}
