import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { timer } from 'rxjs';
import { Login } from 'src/app/models/login';

import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-comp',
  templateUrl: './login-comp.component.html',
  styleUrls: ['./login-comp.component.scss']
})
export class LoginCompComponent implements OnInit {
  @Output()
  public clickedBtn = new EventEmitter<MouseEvent>();

  loginData: Login;
  errEmail = false;
  errPass = false;

  errValidationBack: Array<any>;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.newLoginForm();
  }

  public handleClick(event: MouseEvent) {
    this.clickedBtn.emit(event);
  }

  newLoginForm() {
    this.loginData = new Login();
  }

  login() {
    this.validaForm();

    this.userService.loginUser(this.loginData).subscribe(
      response => {
        console.log(response.token)
        this.router.navigate(['/categorias']);
      },
      err => {
        if (err.error.message) {
          this.errValidationBack = err.error.message;
        } else {
          this.errValidationBack = err.error.error;
        }

        Swal.fire({
          icon: 'error',
          title: 'Erro!',
          text: String(this.errValidationBack),
          confirmButtonText: 'Ok',
        })
      }
    )
  }

  validaForm() {
    let err = 0;

    if (!this.loginData.email || this.loginData.email.length < 1) {
      this.errEmail = true;
      err++;
    } else {
      this.errEmail = false;
      err--;
    }

    if (!this.loginData.password || this.loginData.password.length < 1) {
      this.errPass = true;
      err++;
    } else {
      this.errPass = false;
      err--;
    }

    if (err > 0) {
      return false;
    }
  }
}
