import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { serviceJobModel } from '../models/serviceJobModel';
import { Job } from '../models/job';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor(private http: HttpClient) { }

  url = 'http://localhost:8080';

  cadastro = `${this.url}/service`;
  profileJobs = `${this.url}/service/profile`;
  getOneJob = `${this.url}/serviceId`;
  updateRoute = `${this.url}/service/update`;

  addJob(job: serviceJobModel, token: string): Observable<any> {
    const header = { Authorization: `Bearer ${token}` };

    return this.http.post<serviceJobModel>(this.cadastro, job, {
      headers: header,
    });
  }

  getProfileJobs(uid: string, token: string): Observable<Array<Job>> {
    const header = { Authorization: `Bearer ${token}` };

    const obj = {
      userId: uid
    }

    return this.http.post<Array<Job>>(this.profileJobs, obj, {
      headers: header,
    });
  }

  getOne(id: string, token: string): Observable<Job> {
    const header = { Authorization: `Bearer ${token}` };

    const obj = {
      id: id
    }

    return this.http.post<Job>(this.getOneJob, obj, {
      headers: header,
    });
  }

  update(job: Job, token: string): Observable<Job> {
    const header = { Authorization: `Bearer ${token}` };

    return this.http.put<Job>(this.updateRoute, job, {
      headers: header,
    });
  }
}
