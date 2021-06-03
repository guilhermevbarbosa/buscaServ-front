import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie';

import Swal from 'sweetalert2';

import { JobService } from '../../services/job.service';
import { ActivatedRoute } from '@angular/router';
import { Job } from 'src/app/models/job';

@Component({
  selector: 'app-detalhes-servico',
  templateUrl: './detalhes-servico.component.html',
  styleUrls: ['./detalhes-servico.component.scss']
})
export class DetalhesServicoComponent implements OnInit {
  jobId: string;
  serviceData: Job;

  constructor(private cookieService: CookieService, private jobService: JobService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.jobId = this.route.snapshot.queryParams.id;
    this.newJobObject();
    this.getOne();
  }

  newJobObject() {
    this.serviceData = new Job();
  }

  getOne() {
    const token = this.cookieService.get('JWT');

    this.jobService.getOne(this.jobId, token).subscribe(
      response => {
        this.serviceData.name = response.name;
        this.serviceData.category = response.category;

        this.serviceData.userName = response.userName;
        this.serviceData.email = response.email;
        this.serviceData.tel = response.tel;
        this.serviceData.address = response.address;
        this.serviceData.city = response.city;
        this.serviceData.state = response.state;

        this.serviceData.description = response.description;
        this.serviceData.aprox_val = response.aprox_val;
      },
      error => {
        Swal.fire({
          icon: 'error',
          title: 'Erro!',
          text: error.message,
          confirmButtonText: 'Ok',
        });
      }
    );
  }
}
