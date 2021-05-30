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

    this.userService.verifyToken(token).subscribe(
      () => {
        this.userService.getProfile(uid).subscribe(
          response => {
            const accountType = response.account_type;

            if (accountType == 0) {
              return this.router.navigate(['/']);
            }
          }
        )
      },
      (err) => {
        return this.router.navigate(['/']);
      }
    );

    return true;
  }
}
