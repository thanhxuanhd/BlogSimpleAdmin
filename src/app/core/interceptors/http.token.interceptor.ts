import { Injectable, Injector, Inject } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IAuthenService } from '../interfaces';
import { IAuthenServiceToken } from '../tokens';

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {
  constructor(@Inject(IAuthenServiceToken) private authenService: IAuthenService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headersConfig = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    const token = this.authenService.GetCurrentUser();

    if (token) {
      headersConfig['Authorization'] = `Bearer ${token.AuthenToken}`;
    }

    const request = req.clone({ setHeaders: headersConfig });
    return next.handle(request);
  }
}
