import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { Job } from 'src/app/models/job';
import { FavoriteService } from 'src/app/services/favorite.service';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.scss']
})
export class FavoritosComponent implements OnInit {

  constructor(
    private cookieService: CookieService,
    private favoritesService: FavoriteService,
    public router: Router
  ) { }

  jobs: Array<any>;
  noJobs = false;

  loading = true;

  ngOnInit(): void {
    this.getFavorites();
  }

  getFavorites() {
    const token = this.cookieService.get('JWT');
    const uid = this.cookieService.get('UID');
    this.jobs = [];

    this.favoritesService.getAll(uid, token).subscribe(
      response => {
        this.loading = false;

        if (response.statusCode == 400) {
          this.noJobs = true;
        } else {
          this.noJobs = false;
          this.jobs = response;
        }
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

  openJob(id: string) {
    this.router.navigate(['/servico'], { queryParams: { id: id } });
  }
}
