import { Component, signal, WritableSignal } from '@angular/core';
import { CallService } from '../../sercvices/call.service';
import { Genre } from '../../models/Genre.model';
import { map } from 'rxjs';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-genres',
  imports: [],
  templateUrl: './genres.component.html',
  styleUrl: './genres.component.scss',
})
export class GenresComponent {
  protected genres: WritableSignal<Genre[]> = signal([]);
  constructor(
    private readonly callService: CallService,
    private readonly router: Router
  ) {
    callService
      .getAllGenres()
      .pipe(
        map((res: any) => {
          this.genres.set(res);
        })
      )
      .subscribe();
  }

  setGenre(genre: Genre) {
    this.callService.selectedGenre = genre;
    this.router.navigate(['/movies/genres', genre.id]);
  }
}
