import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../models/Movie.model';
import { Genre } from '../models/Genre.model';

@Injectable({
  providedIn: 'root'
})
export class CallService {
  private readonly _BASE_URL = 'http://127.0.0.1:3000/api/movies';
 selectedGenre:Genre|null=null
  constructor(private readonly http: HttpClient) { }

  getAllMovie():Observable<Movie[]>{
    return this.http.get<Movie[]>(`${this._BASE_URL}/`)
  }

  getMovieById(id:number):Observable<Movie>{
    return this.http.get<Movie>(`${this._BASE_URL}/${id}`)
  }
  getAllGenres(){
    return this.http.get<string[]>(`${this._BASE_URL}/genres`)
  }
  getMoviesByGenre(genre:string):Observable<Movie[]>{
    return this.http.get<Movie[]>(`${this._BASE_URL}/genres/${genre}`)
  }
  getAllActors(){
    return this.http.get(`${this._BASE_URL}/actors`)
  }
  searchMovies(criteria:any){
    return this.http.get(`${this._BASE_URL}/search`)
  }
  getMoviesByActor(id:number){
    return this.http.get(`${this._BASE_URL}/actors/${id}`)
  }
}
