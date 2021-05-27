import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { UserService } from 'src/app/services/user.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(public router: Router, private localStorageService: LocalStorageService, private userService: UserService) { }

  canActivate() {
    const token = this.localStorageService.get('JWT');

    const verify = this.userService.verifyToken(token).subscribe(() => { },
      err => {
        return this.router.navigate(['/']);
      }
    );

    return true;
  }
}
