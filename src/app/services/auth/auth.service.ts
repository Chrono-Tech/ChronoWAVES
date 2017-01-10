import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class AuthService {
    isLoggedIn: boolean = false;

    constructor() {
        console.log("AuthService.constructor");
    }
    
    login(): Observable<boolean> {
        // just resolves successfully after a short pause
        return Observable.of(true)
            .delay(1000)
            .do(v => this.isLoggedIn = true);
    }

    logout(): void {
        this.isLoggedIn = false;
    }
}