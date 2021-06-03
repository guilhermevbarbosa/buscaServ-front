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
  private url = 'http://localhost:8080'

  private cadastro = `${this.url}/user`;
  private login = `${this.url}/login`;
  private token = `${this.url}/token`;
  private profile = `${this.url}/profile`;
  private update = `${this.url}/profile-edit`;

  addUser(user: Cadastro): Observable<any> {
    return this.http.post<Cadastro>(this.cadastro, user);
  }

  editUser(user: any): Observable<any> {
    return this.http.post<any>(this.update, user);
  }

  loginUser(userData: Login): Observable<any> {
    return this.http.post<Login>(this.login, userData);
  }

  getProfile(userId: string): Observable<any> {
    const obj = {
      uid: userId
    };

    return this.http.post<any>(this.profile, obj);
  }

  verifyToken(userToken: any): Observable<any> {
    const header = { Authorization: `Bearer ${userToken}` };

    let x = '';

    return this.http.post(this.token, x, {
      headers: header,
    });
  }
}
