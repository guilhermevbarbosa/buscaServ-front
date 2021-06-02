import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import Swal from 'sweetalert2';

import { Job } from 'src/app/models/job';
import { JobService } from 'src/app/services/job.service';

@Component({
  selector: 'app-meus-servicos',
  templateUrl: './meus-servicos.component.html',
  styleUrls: ['./meus-servicos.component.scss']
})
export class MeusServicosComponent implements OnInit {

  constructor(private cookieService: CookieService, private jobsService: JobService) { }

  jobs: Array<Job>;
  noJobs = false;

  ngOnInit(): void {
    this.getServices();
  }

  async getServices() {
    const token = this.cookieService.get('JWT');
    const uid = this.cookieService.get('UID');

    await this.jobsService.getProfileJobs(uid, token).subscribe(
      response => {
        this.jobs = response;
      },
      error => {
        const message = error.error.error.message;

        if (message == 'Não possui serviços ainda') {
          this.noJobs = true;
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Erro!',
            text: message,
            confirmButtonText: 'Ok',
          });
        }
      }
    )
  }
}
