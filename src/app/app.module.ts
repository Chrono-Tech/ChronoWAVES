import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// Material Design + Flex Layout
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from "@angular/flex-layout";
import { ChartsModule } from 'ng2-charts/ng2-charts';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AmChartsDirective } from "amcharts3-angular2/amcharts.directive";

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// Import our application components
import { LoginFormComponent } from './login-form/login-form.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ExchangeComponent } from './exchange/exchange.component';
import { Logger } from './shared/logger';
import { WavesRestService } from './services/waves-rest/waves-rest.service'
import { Config, TestNetConfig } from './services/config';
import { AssetValuePipe } from './shared/asset-value.pipe';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ExchangeComponent,
    LoginFormComponent,
    ToolbarComponent,
    AmChartsDirective,
    AssetValuePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    MaterialModule.forRoot(),
    FlexLayoutModule.forRoot(),
    NgxDatatableModule,
    ChartsModule
  ],
  providers: [
    WavesRestService,
    Logger,
    { provide: Config, useClass: TestNetConfig }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
