import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginViewModel } from '../models/user.model';
@Injectable()
export class AuthenService {

    /**
     *
     */
    constructor(private http: HttpClient) {
    }

    Login(user: LoginViewModel): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post('', user, { headers: headers }).map(response => {
        });
    }

    Logout() {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post('', null, { headers: headers }).map(response => { });
    }
}
