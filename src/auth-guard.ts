import { Injectable } from '@angular/core';
import { 
    CanActivate,
    Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from '@angular/router';

import { AuthService } from './services/auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private authService: AuthService,
        private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        console.log('[DEBUG] AuthGuard.canActivate() called');
        return this.checkLogin();
    }

    checkLogin(): boolean {
        if (this.authService.isLoggedIn)
            return true;
        this.router.navigate(['/login']);
        return false;
    }
};