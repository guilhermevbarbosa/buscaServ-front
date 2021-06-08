import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { CookieService } from 'ngx-cookie';
import Swal from 'sweetalert2';

import { JobService } from '../../../../services/job.service';
import { ActivatedRoute } from '@angular/router';
import { Job } from 'src/app/models/job';

@Component({
  selector: 'app-edit-job',
  templateUrl: './edit-job.component.html',
  styleUrls: ['./edit-job.component.scss']
})
export class EditJobComponent implements OnInit {
  serviceData: Job;
  jobId: string;

  // VALIDACAO
  errName = false;
  errDesc = false;
  errPrice = false;

  categories = [
    'Manutenção de computadores',
    'Desenvolvimento de sistemas',
    'Manutenção mobile',
    'Manutenção de videogames',
    'Manutenção de outros'
  ]

  loading = true;

  constructor(
    private cookieService: CookieService,
    private jobService: JobService,
    private route: ActivatedRoute,
    private _location: Location
  ) { }

  ngOnInit(): void {
    this.newJobObject();
    this.jobId = this.route.snapshot.queryParams.id;
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
        this.serviceData.description = response.description;
        this.serviceData.category = response.category;
        this.serviceData.aprox_val = response.aprox_val;

        this.loading = false;
      },
      error => {
        this.loading = false;

        Swal.fire({
          icon: 'error',
          title: 'Erro!',
          text: error.message,
          confirmButtonText: 'Ok',
        });
      }
    );
  }

  validaForm() {
    if (!this.serviceData.name || this.serviceData.name.length < 1) {
      this.errName = true;
    } else {
      this.errName = false;
    }

    if (!this.serviceData.description || this.serviceData.description.length < 1) {
      this.errDesc = true;
    } else {
      this.errDesc = false;
    }

    if (!this.serviceData.aprox_val || this.serviceData.aprox_val.length < 1) {
      this.errPrice = true;
    } else {
      this.errPrice = false;
    }
  }

  save() {
    this.validaForm();
    this.loading = true;

    if (this.serviceData.aprox_val != null) {
      let form = this.serviceData;
      Object.assign(form, { id: this.jobId });
      const token = this.cookieService.get('JWT');

      this.jobService.update(form, token).subscribe(
        response => {
          this.loading = false;

          Swal.fire({
            icon: 'success',
            title: 'Sucesso!',
            text: response.message,
            confirmButtonText: 'Ok',
          }).then((result) => {
            if (result.isConfirmed) {
              this._location.back();
            }
          });
        },
        error => {
          this.loading = false;

          Swal.fire({
            icon: 'success',
            title: 'Sucesso!',
            text: error.message,
            confirmButtonText: 'Ok',
          });
        }
      );
    }
  }
}
