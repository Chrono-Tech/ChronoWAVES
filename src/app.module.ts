import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

// Import our application components
import { 
    AppComponent, 
    LoginFormComponent 
} from './components';

import { WavesRestService } from './services/waves-rest/waves-rest.service'

@NgModule({
    bootstrap: [ AppComponent ],
    declarations: [ AppComponent ],
    imports: [
        BrowserModule,
        HttpModule
    ],
    providers: [ WavesRestService ]
})
export class AppModule {}