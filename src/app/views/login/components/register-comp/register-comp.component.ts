import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from "@angular/router"

import Swal from 'sweetalert2';

import { Cadastro } from 'src/app/models/cadastro';
import { UserService } from 'src/app/services/user.service';
import { EstadosService } from 'src/app/services/utils/estados.service';

import { MasksService } from '../../../../services/utils/masks.service';
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

  estados = [];
  estadosSigla = [];

  constructor(
    private userService: UserService,
    private router: Router,
    private masks: MasksService,
    private estadosService: EstadosService
  ) { }

  ngOnInit(): void {
    this.newUserObject();
    this.userData.state = 'SP';
    this.userData.account_type = 0;
    this.getAllEstados();
  }

  async getAllEstados() {
    await this.estadosService.getEstados().subscribe(
      response => {
        this.estados = response;

        this.estados.forEach(element => {
          this.estadosSigla.push(element.sigla);
        });
      }
    )
  }

  // Clique voltar ao login
  handleClick(event: MouseEvent) {
    this.clickedBtn.emit(event);
  }

  newUserObject() {
    this.userData = new Cadastro();
  }

  createUser() {
    this.validaForm();

    this.userService.addUser(this.userData).subscribe(
      (response) => {
        this.resetForm();

        Swal.fire({
          icon: 'success',
          title: 'Sucesso!',
          text: response.message,
          confirmButtonText: 'Ok',
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        })
      },
      err => {
        this.errValidationBack = err.error.errors;

        Swal.fire({
          icon: 'error',
          title: 'Erro!',
          text: err.error.error.message,
          confirmButtonText: 'Ok',
        })

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
    if (!this.userData.name || this.userData.name.length < 1) {
      this.errName = true;
    } else {
      this.errName = false;
    }

    if (!this.userData.email || this.userData.email.length < 1) {
      this.errEmail = true;
    } else {
      this.errEmail = false;
    }

    if (!this.userData.tel || this.userData.tel.length < 1) {
      this.errTel = true;
    } else {
      this.errTel = false;
    }

    if (!this.userData.cpf_cnpj || this.userData.cpf_cnpj.length < 1) {
      this.errCPF = true;
    } else {
      this.errCPF = false;
    }

    if (!this.userData.cep || this.userData.cep.length < 1) {
      this.errCEP = true;
    } else {
      this.errCEP = false;
    }

    if (!this.userData.address || this.userData.address.length < 1) {
      this.errEnd = true;
    } else {
      this.errEnd = false;
    }

    if (!this.userData.city || this.userData.city.length < 1) {
      this.errCity = true;
    } else {
      this.errCity = false;
    }

    if (!this.userData.password || this.userData.password.length < 1) {
      this.errPass = true;
    } else {
      this.errPass = false;
    }
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

  convertTel(input: Element) {
    this.masks.convertTel(<HTMLInputElement>input);
  }

  convertCPF(input: Element) {
    this.masks.convertCPF(<HTMLInputElement>input);
  }

  convertCEP(input: Element) {
    this.masks.convertCEP(<HTMLInputElement>input);
  }
}
