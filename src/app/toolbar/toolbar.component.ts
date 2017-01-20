import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { AnonymousSubscription } from "rxjs/Subscription";
import { Router } from '@angular/router';

import { WavesRestService } from '../services/waves-rest/waves-rest.service';
import { AuthService } from '../services/auth/auth.service';

import { Logger } from '../shared/logger';

/**
 * Main Toolbar for Application
 * - regularly update current blockchain height
 */
@Component({
    selector: 'app-toolbar',
    template: require('./toolbar.component.html'),
    styles: [require('./toolbar.component.css')]
})
export class ToolbarComponent implements OnInit, OnDestroy {
    currentHeight: number;
    currentAddress: string = '3MsKhZJzGZ1hnZJZUPYUAKjGQdk7Q7qoCRa';
    
    heightSubscription: AnonymousSubscription;

    constructor(
        private log: Logger,
        private wavesRest: WavesRestService,
        private authService: AuthService,
        private router: Router) { }

    public isLoggedIn(): boolean {
        return this.authService.isLoggedIn;
    }

    logout() {
        this.log.debug('ToolbarComponent: logout()');

        this.authService.logout();
        this.router.navigate(['/login']);
    }

    public ngOnInit(): void {
        this.log.debug('ToolbarComponent: ngOnInit()');
        this.refreshHeight();
    }

    public ngOnDestroy(): void {
        this.log.debug('ToolbarComponent: ngOnDestroy()');
        if (this.heightSubscription) {
            this.heightSubscription.unsubscribe();
        }
    }

    private refreshHeight() {
        this.wavesRest.height().subscribe(height => {
            this.currentHeight = height;
            this.subscribeToHeight();
        });
    }

    private subscribeToHeight() {
        this.heightSubscription = Observable.timer(10000).first().subscribe(() => this.refreshHeight());
    }
}