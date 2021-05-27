import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(public router: Router) { }

  private isAuthenticated: boolean = false;

  canActivate() {
    if (!this.isAuthenticated) {
      return this.router.navigate(['/']);
    }

    return true;
  }
}
