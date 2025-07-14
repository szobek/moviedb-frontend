import { Component, signal, WritableSignal } from '@angular/core';
import { CallService } from '../../sercvices/call.service';
import { catchError, map } from 'rxjs/operators';
import { Movie } from '../../models/Movie.model';
import { MovieComponent } from '../movie/movie.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { Genre } from '../../models/Genre.model';

@Component({
  selector: 'app-movie-by-genre',
  imports: [MovieComponent],
  templateUrl: './movie-by-genre.component.html',
  styleUrl: './movie-by-genre.component.scss',
})
export class MovieByGenreComponent {
  movies: WritableSignal<Movie[]> = signal([]);
  selectedGenre: Genre | null = null;
  constructor(
    private readonly callService: CallService,
    private readonly route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.selectedGenre = this.callService.selectedGenre;
    const id = this.route.snapshot.paramMap.get('id');
    this.callService
      .getMoviesByGenre(id?.toString() || '')
      .pipe(
        map((res: any) => {
          this.movies.set(res);
        }),
        catchError((err) => {
          switch (err.status) {
            case 404:
              this.movies.set([]);
              break;
          }
          return of([]);
        })
      )
      .subscribe();
  }
}
