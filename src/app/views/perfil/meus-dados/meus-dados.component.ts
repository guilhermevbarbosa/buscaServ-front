import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie';

import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-meus-dados',
  templateUrl: './meus-dados.component.html',
  styleUrls: ['./meus-dados.component.scss']
})
export class MeusDadosComponent implements OnInit {

  constructor(private cookieService: CookieService, private userService: UserService) { }

  uid: string;

  ngOnInit(): void {
    this.uid = this.cookieService.get('UID');

    this.getProfile(this.uid);
  }

  getProfile(uid: string) {
    this.userService.getProfile(uid).subscribe(
      response => {
        console.log(response);
      }
    )
  }
}
