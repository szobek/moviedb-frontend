import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/User.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly _BASE_URL = 'http://127.0.0.1:3000/api/auth';
  user: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  constructor(private readonly http: HttpClient) {}

  register(registeredUser: User): Observable<any> {
    return this.http.post(`${this._BASE_URL}/register`, registeredUser);
  }

  login(user: User): Observable<any> {
    return this.http.post(`${this._BASE_URL}/login`, user);
  }

  getUsers() {
    return this.http.get(`${this._BASE_URL}/users`);
  }
  approveUser(user: User = { id: '-1' } as User) {
    const data = {
      id: user.id,
    };
    return this.http.patch(`${this._BASE_URL}/approval`, data);
  }
  updateAccessToken() {
    const headers = new HttpHeaders({
      refresh_token: this.user.value?.refreshToken || '',
    });
    return this.http.put(`${this._BASE_URL}/refresh-token`, null, { headers });
  }
  promoteUser(user: User = { id: '-1' } as User) {
    const data = {
      id: user.id,
    };
    return this.http.patch(`${this._BASE_URL}/promotion`, data);
  }
  deleteUser(user: User = { id: '-1' } as User) {
    const data = {
      id: user.id,
    };
    return this.http.delete(this._BASE_URL,  { body:data });

  }
}
