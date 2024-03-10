import { Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { CharacterDetailComponent } from './component/character-detail/character-detail.component';
import { SearchResultComponent } from './component/search-result/search-result.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'characters/:id', component: CharacterDetailComponent },
  { path: 'searchResult', component: SearchResultComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
