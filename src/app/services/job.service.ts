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

  private url = 'http://localhost:8080';

  private cadastro = `${this.url}/service`;
  private profileJobs = `${this.url}/service/profile`;
  private getOneJob = `${this.url}/serviceId`;
  private getJobsInCategory = `${this.url}/service/category/`;
  private updateRoute = `${this.url}/service/update`;

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

  getInCategory(category: string, token: string): Observable<Array<Job>> {
    const header = { Authorization: `Bearer ${token}` };

    const obj = {
      categoria: category
    }

    return this.http.post<Array<Job>>(this.getJobsInCategory, obj, {
      headers: header,
    });
  }

  update(job: Job, token: string): Observable<any> {
    const header = { Authorization: `Bearer ${token}` };

    return this.http.put<any>(this.updateRoute, job, {
      headers: header,
    });
  }
}
