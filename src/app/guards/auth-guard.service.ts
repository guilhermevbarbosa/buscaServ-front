import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { CookieService } from 'ngx-cookie';

import { UserService } from 'src/app/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(public router: Router, private userService: UserService, private cookieService: CookieService) { }

  canActivate() {
    const token = this.cookieService.get('JWT');

    this.userService.verifyToken(token).subscribe(() => { },
      err => {
        return this.router.navigate(['/']);
      }
    );

    return true;
  }
}
