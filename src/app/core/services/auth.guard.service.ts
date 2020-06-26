import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UrlConfig } from '../enums';
import { JwtService } from './jwt.service';

@Injectable()
export class AuthGuardService implements CanActivate {
    constructor(private router: Router,
        private jwtService: JwtService) {
    }

    canActivate(activateRoute: ActivatedRouteSnapshot, routerStateSnapshot: RouterStateSnapshot) {
        if (this.jwtService.getToken()) {
            return true;
        } else {
            this.router.navigate([UrlConfig.LOGIN], {
                queryParams: {
                    returnUrl: routerStateSnapshot.url
                }
            });
            return false;
        }
    }
}
