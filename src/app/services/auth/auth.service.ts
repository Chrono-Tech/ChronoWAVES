import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class AuthService {
    isLoggedIn: boolean = false;

    /**
     * Current logged in account address
     */
    public address: string = '3MsKhZJzGZ1hnZJZUPYUAKjGQdk7Q7qoCRa';
    
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