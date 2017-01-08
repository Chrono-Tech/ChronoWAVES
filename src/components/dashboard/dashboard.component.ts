import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth/auth.service';

@Component({
    selector: 'dashboard',
    template: require('./dashboard.component.html')
})
export class DashboardComponent {
    constructor(
        private router: Router,
        private authService: AuthService) {}

}