import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ExchangeComponent } from './exchange/exchange.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { AuthGuard } from './auth-guard';
import { AuthService } from './services/auth/auth.service';

const appRoutes: Routes = [
    { path: 'login', component: LoginFormComponent },
    { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'exchange', component: ExchangeComponent, canActivate: [AuthGuard] }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ],
    providers: [
        AuthGuard,
        AuthService
    ]
})
export class AppRoutingModule {

}