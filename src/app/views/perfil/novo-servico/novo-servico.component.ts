import { Component, OnInit } from '@angular/core';
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
  ]

  constructor(private cookieService: CookieService, private jobService: JobService) { }

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

    if (!this.serviceData.aprox_val || this.serviceData.aprox_val.length < 1) {
      this.errPrice = true;
    } else {
      this.errPrice = false;
    }
  }

  save() {
    this.validaForm();

    let form = this.serviceData;
    Object.assign(form, { user_id: this.cookieService.get('UID') });
    const token = this.cookieService.get('JWT');

    this.jobService.addJob(form, token).subscribe(
      response => {
        Swal.fire({
          icon: 'success',
          title: 'Sucesso!',
          text: response.message,
          confirmButtonText: 'Ok',
        });
      },
      error => {
        Swal.fire({
          icon: 'error',
          title: 'Erro!',
          text: error.error.message,
          confirmButtonText: 'Ok',
        })
      }
    );
  }
}
