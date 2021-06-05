import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie';

import Swal from 'sweetalert2';

import { UserService } from 'src/app/services/user.service';
import { EstadosService } from 'src/app/services/utils/estados.service';

import { MasksService } from '../../../services/utils/masks.service';
import { CepService } from '../../../services/utils/cep.service';

import { Cadastro } from 'src/app/models/cadastro';

@Component({
  selector: 'app-meus-dados',
  templateUrl: './meus-dados.component.html',
  styleUrls: ['./meus-dados.component.scss']
})
export class MeusDadosComponent implements OnInit {

  // VALIDACAO
  errName = false;
  errEmail = false;
  errTel = false;
  errCPF = false;
  errCEP = false;
  errEnd = false;
  errCity = false;

  errValidationBack: Array<any>;

  estados = [];
  estadosSigla = [];

  userData: Cadastro;

  constructor(
    private cookieService: CookieService,
    private userService: UserService,
    private masks: MasksService,
    private estadosService: EstadosService,
    private cepService: CepService
  ) { }

  uid: string;

  ngOnInit(): void {
    this.uid = this.cookieService.get('UID');
    this.newUserObject();

    this.getProfile(this.uid);
    this.getAllEstados();
  }

  getProfile(uid: string) {
    this.userService.getProfile(uid).subscribe(
      response => {
        this.userData.name = response.name;
        this.userData.email = response.email;
        this.userData.tel = response.tel;
        this.userData.cpf_cnpj = response.cpf_cnpj;
        this.userData.cep = response.cep;
        this.userData.address = response.address;
        this.userData.state = response.state;
        this.userData.account_type = response.account_type;
        this.userData.city = response.city;
      }
    )
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

  async getEndereco(cep: string) {
    if (cep.length == 9) {
      cep = cep.replace("-", "");

      await this.cepService.getData(cep).subscribe(
        response => {
          if (!response.erro) {
            this.userData.state = response.uf;
            this.userData.city = response.localidade;
            this.userData.address = response.logradouro;
          }
        }
      );
    }
  }

  newUserObject() {
    this.userData = new Cadastro();
  }

  convertTel(input: Element) {
    this.masks.convertTel(<HTMLInputElement>input);
  }

  convertCPF(input: Element) {
    this.masks.convertCPF(<HTMLInputElement>input);
  }

  convertCEP(input: Element) {
    this.masks.convertCEP(<HTMLInputElement>input);
    this.getEndereco(this.userData.cep);
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
  }

  save() {
    this.validaForm();

    let form = this.userData;
    Object.assign(form, { id: this.uid });

    this.userService.editUser(form).subscribe(
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
        });
      }
    )
  }
}
