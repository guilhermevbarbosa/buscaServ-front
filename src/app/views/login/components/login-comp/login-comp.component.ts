import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { Login } from 'src/app/models/login';

import { UserService } from 'src/app/services/user.service';
import { LocalStorageService } from 'src/app/services/utils/local-storage.service';
import { CookieService } from 'ngx-cookie';

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

  constructor(private userService: UserService, private router: Router, private cookieService: CookieService) { }

  ngOnInit(): void {
    this.newLoginForm();
    this.tokenValidator();
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
        this.cookieService.put('JWT', response.token);
        this.cookieService.put('UID', response.uid);
        this.tokenValidator();
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

  tokenValidator() {
    const token = this.cookieService.get('JWT');

    if (token) {
      this.userService.verifyToken(token).subscribe(() => {
        return this.router.navigate(['/categorias']);
      });
    }
  }
}
