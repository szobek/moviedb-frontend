import { Component, signal, WritableSignal } from '@angular/core';
import { CallService } from '../../sercvices/call.service';
import { map } from 'rxjs/operators';
import { Actor } from '../../models/Actor.model';
import { Movie } from '../../models/Movie.model';
import { MovieComponent } from '../movie/movie.component';

@Component({
  selector: 'app-actors',
  imports: [
    MovieComponent
  ],
  templateUrl: './actors.component.html',
  styleUrl: './actors.component.scss',
})
export class ActorsComponent {
  protected actors: WritableSignal<Actor[]> = signal([]);
  protected selectedActorMovies: WritableSignal<Movie[]> = signal([]);

  constructor(private readonly callService: CallService) {
    callService
      .getAllActors()
      .pipe(
        map((result: any) => {
          this.actors.set(result);
        })
      )
      .subscribe();
  }

  getMovies(actor: Actor) {
    this.callService.getMoviesByActor(actor.id)
    .pipe(
      map((result: any) => {
        this.selectedActorMovies.set(result);
      })
    )
    .subscribe()
  }
}
