import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from '../services/config.service';
import { IAuthenServiceToken } from '../tokens/authen.service.token';
import { IAuthenService } from '../interfaces/iauthen-service';

@Injectable()
export class DataService {
    private header: HttpHeaders;
    constructor(
        private http: HttpClient,
        private configuration: ConfigService,
        @Inject(IAuthenServiceToken) private authenService: IAuthenService
    ) {
        this.header = new HttpHeaders();
        this.header = this.header.append('Content-Type', 'application/json');
    }


    Get(url: string): Observable<any> {
        this.header = this.header.delete('Authorization');
        if (this.authenService.GetCurrentUser() && this.authenService.GetCurrentUser().AuthenToken) {
            this.header = this.header.append('Authorization', 'Bearer ' + this.authenService.GetCurrentUser().AuthenToken);
        }
        const urlGet = this.configuration.getConfiguration().BASE_API + url;
        return this.http.get(urlGet, { headers: this.header });
    }
    Post(url: string, model?: any): Observable<any> {
        this.header = this.header.delete('Authorization');
        if (this.authenService.GetCurrentUser() && this.authenService.GetCurrentUser().AuthenToken) {
            this.header = this.header.append('Authorization', 'Bearer ' + this.authenService.GetCurrentUser().AuthenToken);
        }
        const urlPost = this.configuration.getConfiguration().BASE_API + url;
        return this.http.post(urlPost, model, { headers: this.header });

    }
    Put(url: string, model?: any): Observable<any> {
        this.header = this.header.delete('Authorization');
        if (this.authenService.GetCurrentUser() && this.authenService.GetCurrentUser().AuthenToken) {
            this.header = this.header.append('Authorization', 'Bearer ' + this.authenService.GetCurrentUser().AuthenToken);
        }
        const urlPut = this.configuration.getConfiguration().BASE_API + url;
        return this.http.put(urlPut, model, { headers: this.header });
    }
    Delete(url: string): Observable<any> {
        this.header = this.header.delete('Authorization');
        if (this.authenService.GetCurrentUser() && this.authenService.GetCurrentUser().AuthenToken) {
            this.header = this.header.append('Authorization', 'Bearer ' + this.authenService.GetCurrentUser().AuthenToken);
        }
        const urlDelete = this.configuration.getConfiguration().BASE_API + url;
        return this.http.delete(urlDelete, { headers: this.header });
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
