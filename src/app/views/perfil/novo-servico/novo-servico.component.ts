import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { CookieService } from 'ngx-cookie';
import Swal from 'sweetalert2';

import { serviceJobModel } from 'src/app/models/serviceJobModel';
import { JobService } from '../../../services/job.service';

@Component({
  selector: 'app-novo-servico',
  templateUrl: './novo-servico.component.html',
  styleUrls: ['./novo-servico.component.scss']
})
export class NovoServicoComponent implements OnInit {

  serviceData: serviceJobModel;

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
  ];

  loading = false;

  constructor(
    private cookieService: CookieService,
    private jobService: JobService,
    private _location: Location
  ) { }

  ngOnInit(): void {
    this.newJobObject();
    this.serviceData.category = 'Manutenção de computadores';
  }

  newJobObject() {
    this.serviceData = new serviceJobModel();
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

    if (!this.serviceData.aprox_val || Number(!this.serviceData.aprox_val) > 0) {
      this.errPrice = true;
    } else {
      this.errPrice = false;
    }
  }

  save() {
    this.validaForm();
    this.loading = true;

    let form = this.serviceData;
    Object.assign(form, { user_id: this.cookieService.get('UID') });
    const token = this.cookieService.get('JWT');

    if (!this.errPrice) {
      this.jobService.addJob(form, token).subscribe(
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
            icon: 'error',
            title: 'Erro!',
            text: error.error.message,
            confirmButtonText: 'Ok',
          })
        }
      );
    } else {
      this.loading = false;
    }

  }
}
