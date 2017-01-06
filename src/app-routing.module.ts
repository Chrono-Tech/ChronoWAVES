import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';

import { DashboardComponent, LoginFormComponent } from './components';


const appRoutes: Routes = [

    { path: 'login', component: LoginFormComponent },
    { path: '', component: DashboardComponent },
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {

}