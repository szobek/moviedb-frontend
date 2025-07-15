import { Component, signal, WritableSignal } from '@angular/core';
import { Genre } from '../../models/Genre.model';
import { CallService } from '../../sercvices/call.service';
import { map } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { Movie } from '../../models/Movie.model';
import { MovieComponent } from '../movie/movie.component';

@Component({
  selector: 'app-movie-search',
  imports: [FormsModule,MovieComponent],
  templateUrl: './movie-search.component.html',
  styleUrl: './movie-search.component.scss',
})
export class MovieSearchComponent {
  criteria = {
    genre: '',
    actor: '',
    rating: 1,
    year: 1950,
    title: '',
  };
  genres: WritableSignal<Genre[]> = signal([]);
  actors: WritableSignal<any[]> = signal([]);
  years: number[] = [];
  ratings: number[] = [];
  movies: WritableSignal<Movie[]> = signal([]);


  constructor(private readonly callService: CallService) {
    callService
      .getAllGenres()
      .pipe(
        map((res: any) => {
          this.genres.set(res);
        })
      )
      .subscribe();

    callService
      .getAllActors()
      .pipe(
        map((res: any) => {
          this.actors.set(res);
        })
      )
      .subscribe();
    this.createRatingArray();
    this.createYearsArray();
  }

  createYearsArray() {
    const years = Array.from({ length: 2026 - 1950 }, (_, i) => 1950 + i);
    this.years = years;
  }

  createRatingArray() {
    const ratings = Array.from({ length: 10 }, (_, i) => 1 + i);
    this.ratings = ratings;
  }

  search(){
    this.callService.searchMovies(this.criteria)
   .pipe(
    map((res:any)=>{
      this.movies.set(res)
      console.log(res);
      
    })
   ) 
    .subscribe()
  }
}
