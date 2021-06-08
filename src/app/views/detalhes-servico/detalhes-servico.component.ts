import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CookieService } from 'ngx-cookie';
import Swal from 'sweetalert2';

import { JobService } from '../../services/job.service';
import { FavoriteService } from '../../services/favorite.service';

import { Job } from 'src/app/models/job';

@Component({
  selector: 'app-detalhes-servico',
  templateUrl: './detalhes-servico.component.html',
  styleUrls: ['./detalhes-servico.component.scss']
})
export class DetalhesServicoComponent implements OnInit {
  jobId: string;
  serviceData: Job;
  favoriteEnable = true;

  loading = true;

  constructor(
    private cookieService: CookieService,
    private jobService: JobService,
    private route: ActivatedRoute,
    private favoriteService: FavoriteService
  ) { }

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

        this.verifyIfServiceHasFavorited();
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

  favorite() {
    const token = this.cookieService.get('JWT');
    const uid = this.cookieService.get('UID');
    this.loading = true;

    this.favoriteService.create(this.jobId, uid, token).subscribe(
      response => {
        this.loading = false;

        Swal.fire({
          icon: 'success',
          title: 'Favoritado!',
          text: response.message,
          confirmButtonText: 'Ok',
        });

        this.verifyIfServiceHasFavorited();
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
    )
  }

  desfavorite() {
    const token = this.cookieService.get('JWT');
    const uid = this.cookieService.get('UID');
    this.loading = true;

    this.favoriteService.delete(this.jobId, uid, token).subscribe(
      response => {
        this.loading = false;

        Swal.fire({
          icon: 'success',
          title: 'Desfavoritado!',
          text: response.message,
          confirmButtonText: 'Ok',
        });

        this.verifyIfServiceHasFavorited();
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
    )
  }

  verifyIfServiceHasFavorited() {
    const token = this.cookieService.get('JWT');
    const uid = this.cookieService.get('UID');
    this.loading = true;

    this.favoriteService.verifyIfServiceHasFavorited(this.jobId, uid, token).subscribe(
      response => {
        if (response.count == 1) {
          this.favoriteEnable = false;
        } else {
          this.favoriteEnable = true;
        }

        this.loading = false;
      },
      error => {
        Swal.fire({
          icon: 'error',
          title: 'Erro!',
          text: error.message,
          confirmButtonText: 'Ok',
        });

        this.loading = false;
      }
    )
  }
}
