import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { Cadastro } from 'src/app/models/cadastro';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register-comp',
  templateUrl: './register-comp.component.html',
  styleUrls: ['./register-comp.component.scss']
})
export class RegisterCompComponent implements OnInit {
  @Output()
  public clickedBtn = new EventEmitter<MouseEvent>();

  userData: Cadastro;

  // VALIDACAO
  errName = false;
  errEmail = false;
  errTel = false;
  errCPF = false;
  errCEP = false;
  errEnd = false;
  errCity = false;
  errPass = false;

  errValidationBack: Array<any>;

  public handleClick(event: MouseEvent) {
    this.clickedBtn.emit(event);
  }

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.newUser();

    this.userData.state = 'SP';
  }

  newUser() {
    this.userData = new Cadastro();
  }

  createUser() {
    this.userService.addUser(this.userData).subscribe(
      (response) => {
        this.resetForm();
        console.log(response.message);
      },
      err => {
        this.errValidationBack = err.error.errors;
        alert(err.error.message)

        for (const key in this.errValidationBack) {
          if (!this.errValidationBack.hasOwnProperty(key)) continue;

          var errors = this.errValidationBack[key];
          for (var index in errors) {
            if (!errors.hasOwnProperty(index)) continue;

            console.log(errors[index]);
          }
        }

      })
  }

  validaForm() {

  }

  resetForm() {
    this.userData.name = '';
    this.userData.email = '';
    this.userData.tel = '';
    this.userData.cpf_cnpj = '';
    this.userData.cep = '';
    this.userData.address = '';
    this.userData.state = '';
    this.userData.city = '';
    this.userData.password = '';
  }
}
