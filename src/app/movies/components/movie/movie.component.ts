import { Component, Input, signal, WritableSignal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Movie } from '../../models/Movie.model';

@Component({
  selector: 'app-movie',
  imports: [RouterModule],
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.scss',
})
export class MovieComponent {
  protected movie: Movie|null=null
  @Input()
  set inputMovie(movie: Movie|null) {
    this.movie = movie;
  }
}
