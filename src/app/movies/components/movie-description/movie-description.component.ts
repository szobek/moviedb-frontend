import { Component, inject, signal, WritableSignal } from '@angular/core';
import { CallService } from '../../sercvices/call.service';
import { map } from 'rxjs';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Movie } from '../../models/Movie.model';
import { MovieComponent } from '../movie/movie.component';

@Component({
  selector: 'app-movie-description',
  imports: [
    RouterModule, MovieComponent
  ],
  templateUrl: './movie-description.component.html',
  styleUrl: './movie-description.component.scss'
})
export class MovieDescriptionComponent {
private readonly callService=inject(CallService)
private readonly route=inject(ActivatedRoute)
movie:WritableSignal<Movie|null>=signal(null)
ngOnInit(){
  const id = this.route.snapshot.params['id'];
  
  this.callService.getMovieById(id)
  .pipe(
    map((result:Movie)=>{
      this.movie.set(result);
    })
  )
  .subscribe()
}
}
