import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginViewModel, LoggedInUser } from '../models/user.model';
import { SystemConfig } from '../enum/system.enum';
import { ConfigService } from '../services/config.service';
import 'rxjs/add/operator/map';
@Injectable()
export class AuthenService {

    /**
     *
     */
    constructor(private http: HttpClient, private configService: ConfigService) {
    }

    Login(user: LoginViewModel): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const url = this.configService.getConfiguration().BASE_API + '/api/Account/Login';
        return this.http.post(url, user, { headers: headers }).map(response => {
            if (response) {
                localStorage.setItem(SystemConfig.CURRENT_USER, JSON.stringify(response));
            } else {
                localStorage.removeItem(SystemConfig.CURRENT_USER);
            }
        });
    }

    Logout() {
        localStorage.removeItem(SystemConfig.CURRENT_USER);
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post('', null, { headers: headers }).map(response => { });
    }

    IsUserAuthenticated(): boolean {
        const user = localStorage.getItem(SystemConfig.CURRENT_USER);
        if (user != null) {
            return true;
        }
        return false;
    }

    GetCurrentUser(): LoggedInUser {
        let user: LoggedInUser;
        if (this.IsUserAuthenticated()) {
            const userData = JSON.parse(localStorage.getItem(SystemConfig.CURRENT_USER));
            user = new LoggedInUser(
                userData.Id,
                userData.AuthenToken,
                userData.ExpiresIn,
                userData.FullName,
                userData.Roles);
        } else {
            user = null;
        }
        return user;
    }
}
