import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CepService {

  constructor(private http: HttpClient) { }

  private url = 'https://viacep.com.br/ws/';

  getData(cep: string) {
    return this.http.get<any>(`${this.url}${cep}/json`);
  }
}
