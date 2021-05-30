import { Component, OnInit } from '@angular/core';

import { CookieService } from 'ngx-cookie';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  constructor(private cookieService: CookieService, private userService: UserService) { }

  uid: string;
  accountType = 0;

  ngOnInit(): void {
    this.uid = this.cookieService.get('UID');
    this.getProfile(this.uid);
  }

  getProfile(uid: string) {
    this.userService.getProfile(uid).subscribe(
      response => {
        this.accountType = response.account_type;
      }
    )
  }
}
