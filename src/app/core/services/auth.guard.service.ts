import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { SystemConfig, UrlConfig } from '../enum/system.enum';

@Injectable()
export class AuthGuardService implements CanActivate {
    constructor(private router: Router) {
    }

    canActivate(activateRoute: ActivatedRouteSnapshot, routerStateSnapshot: RouterStateSnapshot) {
        if (localStorage.getItem(SystemConfig.CURRENT_USER)) {
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
