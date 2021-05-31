import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CookieService } from 'ngx-cookie';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss']
})
export class CategoriasComponent implements OnInit {

  constructor(private cookieService: CookieService, private userService: UserService, private router: Router) { }

  uid: string;
  accountType = 0;

  categorias = [
    {
      title: "Manutenção de computadores", icon: 'assets/laptop.svg'
    },
    {
      title: "Desenvolvimento de sistemas", icon: 'assets/mouse.svg'
    },
    {
      title: "Manutenção mobile", icon: 'assets/tablet.svg'
    },
    {
      title: "Manutenção de videogames", icon: 'assets/videogames.svg'
    },
    {
      title: "Manutenção de outros", icon: 'assets/manutencao.svg'
    },
  ]

  ngOnInit(): void {
    this.uid = this.cookieService.get('UID');
    this.getProfile(this.uid);
  }

  getProfile(uid: string) {
    this.userService.getProfile(uid).subscribe(
      response => {
        this.accountType = response.account_type;

        if (this.accountType == 1) {
          this.router.navigate(['/perfil']);
        }
      }
    )
  }

}
