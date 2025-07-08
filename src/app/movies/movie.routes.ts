import { Routes } from '@angular/router';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { MovieDescriptionComponent } from './components/movie-description/movie-description.component';

export const movieRoutes: Routes = [
    { path: '', component: MovieListComponent },
    { path: ':id', component:MovieDescriptionComponent}
];
