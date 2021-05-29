import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Cadastro } from '../models/cadastro';
import { Login } from '../models/login';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  url = 'http://localhost:8080'

  cadastro = `${this.url}/user`;
  login = `${this.url}/login`;
  token = `${this.url}/token`;
  profile = `${this.url}/profile`;

  addUser(user: Cadastro): Observable<any> {
    return this.http.post<Cadastro>(this.cadastro, user);
  }

  loginUser(userData: Login): Observable<any> {
    return this.http.post<Login>(this.login, userData);
  }

  getProfile(userId: string): Observable<any> {
    return this.http.post<any>(this.profile, userId);
  }

  verifyToken(userToken: any): Observable<any> {
    const header = { Authorization: `Bearer ${userToken}` };

    let x = '';

    return this.http.post(this.token, x, {
      headers: header,
    });
  }
}
