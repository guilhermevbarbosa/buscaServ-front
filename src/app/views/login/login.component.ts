import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor() { }

  fieldsType = 'login';

  ngOnInit(): void {
  }

  criarContaClick(e) {
    this.fieldsType = 'cadastro';
  }

  voltarLoginClick(e) {
    this.fieldsType = 'login';
  }
}
