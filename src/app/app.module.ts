import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// Material Design + Flex Layout
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from "@angular/flex-layout";

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// Import our application components
import { LoginFormComponent } from './login-form/login-form.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ToolbarComponent } from './toolbar/toolbar.component';

import { Logger } from './shared/logger';
import { WavesRestService } from './services/waves-rest/waves-rest.service'
import { Config, TestNetConfig } from './services/config';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginFormComponent,
    ToolbarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    MaterialModule.forRoot(),
    FlexLayoutModule.forRoot()
  ],
  providers: [
    WavesRestService,
    Logger,
    { provide: Config, useClass: TestNetConfig }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
