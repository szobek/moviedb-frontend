import { Routes } from '@angular/router';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { MovieDescriptionComponent } from './components/movie-description/movie-description.component';
import { GenresComponent } from './components/genres/genres.component';
import { MovieByGenreComponent } from './components/movie-by-genre/movie-by-genre.component';

export const movieRoutes: Routes = [
    { path: '', component: MovieListComponent },
    { path: 'genres',component:GenresComponent},
    { path: 'genres/:id',component:MovieByGenreComponent},
    { path: ':id', component:MovieDescriptionComponent},
];
