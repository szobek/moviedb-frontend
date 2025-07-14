import { Component, signal, WritableSignal } from '@angular/core';
import { CallService } from '../../sercvices/call.service';
import { map } from 'rxjs/operators';
import { Movie } from '../../models/Movie.model';
import { MovieComponent } from '../movie/movie.component';

@Component({
  selector: 'app-movie-by-genre',
  imports: [MovieComponent],
  templateUrl: './movie-by-genre.component.html',
  styleUrl: './movie-by-genre.component.scss',
})
export class MovieByGenreComponent {
  movies: WritableSignal<Movie[]> = signal([]);
  constructor(private readonly callService: CallService) {
    callService
      .getMoviesByGenre()
      .pipe(
        map((res: any) => {
          this.movies.set(res);
          
        })
      )
      .subscribe();
  }
}
