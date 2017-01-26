import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';

@Component({
    selector: 'login-form',
    template: require('./login-form.component.html')
})
export class LoginFormComponent implements OnInit {
    public form: FormGroup;

    constructor(
        private fb: FormBuilder,
        public authService: AuthService,
        private router: Router) {
    }

    ngOnInit() {
        this.form = this.fb.group({
            seed: [ null, Validators.compose([Validators.required]) ]
        });
    }

    onSubmit() {
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