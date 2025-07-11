import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../models/Movie.model';

@Injectable({
  providedIn: 'root'
})
export class CallService {
  private readonly _BASE_URL = 'http://127.0.0.1:3000';

  constructor(private readonly http: HttpClient) { }

  getAllMovie():Observable<Movie[]>{
    return this.http.get<Movie[]>(`${this._BASE_URL}/movies`)
  }

  getMovieById(id:number):Observable<Movie>{
    return this.http.get<Movie>(`${this._BASE_URL}/movies/${id}`)
  }
}
