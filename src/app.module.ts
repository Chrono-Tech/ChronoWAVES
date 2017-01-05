import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

// Import our application components
import { 
    AppComponent, 
    LoginFormComponent,
    DashboardComponent,
    ToolbarComponent
} from './components';

import { Logger } from './shared/logger';

import { WavesRestService } from './services/waves-rest/waves-rest.service'

import {Config, TestNetConfig } from './services/config';

const appRoutes: Routes = [

    { path: 'login', component: LoginFormComponent },
    { path: '', component: DashboardComponent },
];

@NgModule({
    bootstrap: [ AppComponent ],
    declarations: [
        AppComponent,
        DashboardComponent,
        LoginFormComponent,
        ToolbarComponent
    ],
    imports: [
        BrowserModule,
        HttpModule,
        RouterModule.forRoot(appRoutes)
    ],
    providers: [ 
        WavesRestService,
        Logger,
        { provide: Config, useClass: TestNetConfig } 
    ]

})
export class AppModule {}