import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


import { Job } from 'src/app/models/job';
import { JobService } from 'src/app/services/job.service';

@Component({
  selector: 'app-meus-servicos',
  templateUrl: './meus-servicos.component.html',
  styleUrls: ['./meus-servicos.component.scss']
})
export class MeusServicosComponent implements OnInit {

  constructor(private cookieService: CookieService, private jobsService: JobService, public router: Router) { }

  jobs: Array<Job>;
  noJobs = false;

  loading = true;

  ngOnInit(): void {
    this.getServices();
  }

  getServices() {
    const token = this.cookieService.get('JWT');
    const uid = this.cookieService.get('UID');
    this.loading = true;

    this.jobsService.getProfileJobs(uid, token).subscribe(
      response => {
        this.jobs = response;
        this.loading = false;
      },
      error => {
        const message = error.error.error.message;
        this.loading = false;

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

  openJob(id: string) {
    this.router.navigate(['/editar-servico'], { queryParams: { id: id } });
  }

  handleDelete(job: Job) {
    Swal.fire({
      icon: 'warning',
      title: `Deseja excluir ${job.name}`,
      showDenyButton: true,
      confirmButtonText: "Excluir",
      denyButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteJob(job.id);
      }
    })
  }

  deleteJob(id: string) {
    const token = this.cookieService.get('JWT');
    this.loading = true;

    this.jobsService.delete(id, token).subscribe(
      response => {
        this.loading = false;

        Swal.fire({
          icon: 'success',
          title: 'Excluido com sucesso!',
          text: response.message,
          confirmButtonText: 'Ok',
        });

        this.getServices();
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
}
