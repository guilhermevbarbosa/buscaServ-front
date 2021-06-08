import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';


import { Job } from 'src/app/models/job';
import { JobService } from 'src/app/services/job.service';

@Component({
  selector: 'app-categoria-selecionada',
  templateUrl: './categoria-selecionada.component.html',
  styleUrls: ['./categoria-selecionada.component.scss']
})
export class CategoriaSelecionadaComponent implements OnInit {

  constructor(
    private cookieService: CookieService,
    private jobsService: JobService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  jobs: Array<Job>;
  noJobs = false;
  categoria: string;

  loading = true;

  ngOnInit(): void {
    this.categoria = this.route.snapshot.queryParams.id;
    this.getServices();
  }

  getServices() {
    const token = this.cookieService.get('JWT');

    this.jobsService.getInCategory(this.categoria, token).subscribe(
      response => {
        if (response.length > 0) {
          this.jobs = response;
        } else {
          this.noJobs = true;
        }

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

  openJob(id: string) {
    this.router.navigate(['/servico'], { queryParams: { id: id } });
  }
}
