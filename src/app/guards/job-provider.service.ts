import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { CookieService } from 'ngx-cookie';

import { UserService } from 'src/app/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class JobProvider implements CanActivate {

  constructor(public router: Router, private userService: UserService, private cookieService: CookieService) { }

  canActivate() {
    const token = this.cookieService.get('JWT');
    const uid = this.cookieService.get('UID');

    if (!token) {
      return this.router.navigate(['/']);
    }

    this.verifyToken(token, uid);
  }

  async getProfile(uid: string) {
    await this.userService.getProfile(uid).subscribe(
      response => {
        const accountType = response.account_type;

        if (accountType == 1) {
          return true;
        } else {
          return this.router.navigate(['/']);
        }
      }
    )
  }

  async verifyToken(token: string, uid: string) {
    await this.userService.verifyToken(token).subscribe(
      () => {
        this.getProfile(uid);
      },
      err => {
        return this.router.navigate(['/']);
      }
    );
  }
}
