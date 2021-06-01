import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { serviceJobModel } from '../models/serviceJobModel';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor(private http: HttpClient) { }

  url = 'http://localhost:8080';

  cadastro = `${this.url}/service`;

  addJob(job: serviceJobModel, token: string): Observable<any> {
    const header = { Authorization: `Bearer ${token}` };

    return this.http.post<serviceJobModel>(this.cadastro, job, {
      headers: header,
    });
  }
}
