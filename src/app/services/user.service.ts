import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Cadastro } from '../models/cadastro';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  url = `http://localhost:8080/user`;

  addUser(user: Cadastro): Observable<any> {
    return this.http.post<Cadastro>(this.url, user);
  }
}
