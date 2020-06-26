import { Injectable } from '@angular/core';
import { SystemConfig } from '../enums';


@Injectable()
export class JwtService {

  getToken(): string {
    return window.localStorage[SystemConfig.CURRENT_USER];
  }

  saveToken(token: string) {
    window.localStorage[SystemConfig.CURRENT_USER] = token;
  }

  destroyToken() {
    window.localStorage.removeItem(SystemConfig.CURRENT_USER);
  }

}
