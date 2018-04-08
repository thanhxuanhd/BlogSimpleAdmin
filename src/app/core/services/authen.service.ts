import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginViewModel } from '../models/user.model';
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
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post('', null, { headers: headers }).map(response => { });
    }
}
