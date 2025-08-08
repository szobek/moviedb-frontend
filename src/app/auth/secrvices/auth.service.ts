import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/User.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly _BASE_URL = 'http://127.0.0.1:3000/api/auth';
  constructor(private readonly http: HttpClient) { }

  register(registeredUser:User):Observable<any>{
    return this.http.post(`${this._BASE_URL}/register`,registeredUser)
  }
  
}
