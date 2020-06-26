import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LoginViewModel, LoggedInUser } from '../models/user.model';
import { ConfigService, JwtService } from '../services';
import { map } from 'rxjs/operators';
@Injectable()
export class AuthenService {

    /**
     *
     */
    constructor(private http: HttpClient,
        private configService: ConfigService,
        private jwtService: JwtService) {
    }

    Login(user: LoginViewModel): Observable<any> {
        const url = this.configService.getConfiguration().BASE_API +
                 `/api/${this.configService.getConfiguration().API_VERSION}/Token/Login`;
        return this.http.post(url, user)
            .pipe(
                map((response) => {
                    if (response) {
                        this.jwtService.saveToken(JSON.stringify(response));
                    } else {
                        this.jwtService.destroyToken();
                    }
                })
            );


    }

    Logout() {
        this.jwtService.destroyToken();
        const url = this.configService.getConfiguration().BASE_API + '/api/Token/Logout';
        return this.http.post(url, null);
    }

    IsUserAuthenticated(): boolean {
        const user = this.jwtService.getToken();
        if (user != null) {
            return true;
        }
        return false;
    }

    GetCurrentUser(): LoggedInUser {
        let user: LoggedInUser;
        if (this.IsUserAuthenticated()) {
            const userData = JSON.parse(this.jwtService.getToken());
            user = new LoggedInUser(
                userData.Id,
                userData.AuthenToken,
                userData.ExpiresIn,
                userData.FullName,
                userData.Roles,
                userData.Email);
        } else {
            user = null;
        }
        return user;
    }

    HandError(error: any) {
        switch (error.status) {
            case 401:
            case 500:
            default:
                console.log('Hander Error');
        }
    }
}
