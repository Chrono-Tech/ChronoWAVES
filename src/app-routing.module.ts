import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';

import { DashboardComponent, LoginFormComponent } from './components';
import { AuthGuard } from './auth-guard';
import { AuthService } from './services/auth/auth.service';

const appRoutes: Routes = [

    { path: 'login', component: LoginFormComponent },
    { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
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