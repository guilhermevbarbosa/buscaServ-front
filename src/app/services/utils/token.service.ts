import { Injectable } from '@angular/core';

import { UserService } from 'src/app/services/user.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private localStorageService: LocalStorageService, private userService: UserService) { }


}
