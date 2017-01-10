import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth/auth.service';

@Component({
    selector: 'login-form',
    template: require('./login-form.component.html')
})
export class LoginFormComponent {

    constructor(
        public authService: AuthService,
        private router: Router) {
    }

    login() {
        this.authService.login().subscribe(() => {
            if (this.authService.isLoggedIn) {
                let redirect = '/';
                this.router.navigate([redirect]);
            }
        });
    }

    logout() {
        this.authService.logout();
        this.router.navigate(['/']);
    }
}