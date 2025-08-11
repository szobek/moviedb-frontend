import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/User.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly _BASE_URL = 'http://127.0.0.1:3000/api/auth';
  user:BehaviorSubject<User|null> = new BehaviorSubject<User|null>(null)
  constructor(private readonly http: HttpClient) { }

  register(registeredUser:User):Observable<any>{
    return this.http.post(`${this._BASE_URL}/register`,registeredUser)
  }

  login(user:User):Observable<any>{
    return this.http.post(`${this._BASE_URL}/login`,user)
  }

  getUsers(){
     const headers = new HttpHeaders({
      'Authorization': 'Bearer '+this.user.value?.accessToken||''
    });
    return this.http.get(`${this._BASE_URL}/users`,{headers})

  }
  
}
