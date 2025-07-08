import { Component, signal, WritableSignal } from '@angular/core';
import { CallService } from '../../sercvices/call.service';
import { map } from 'rxjs';
import { Movie } from '../../models/Movie.model';

@Component({
  selector: 'app-movie-list',
  imports: [],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.scss'
})
export class MovieListComponent {
  movies: WritableSignal<Movie[]|null> = signal(null);

constructor(private readonly callService: CallService){
  callService.getAllMovie()
  .pipe(
    map((result:Movie[])=>{
      this.movies.set(result);
    })
  )
  .subscribe()
}
}
