import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EstadosService {

  constructor(private http: HttpClient) { }

  url = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados';

  getEstados() {
    return this.http.get<any>(this.url);
  }
}
