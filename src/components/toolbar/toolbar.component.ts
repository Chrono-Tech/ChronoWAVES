import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { AnonymousSubscription } from "rxjs/Subscription";

import { WavesRestService } from '../../services/waves-rest/waves-rest.service';

import { Logger } from '../../shared/logger';

@Component({
    selector: 'toolbar',
    template: require('./toolbar.component.html')
})
export class ToolbarComponent implements OnInit, OnDestroy {
    currentHeight: number;
    heightSubscription: AnonymousSubscription;

    constructor(
        private log: Logger,
        private wavesRest: WavesRestService) { }

    public ngOnInit(): void {
        this.log.debug('ToolbarComponent: ngOnInit()');
        this.refreshHeight();
    }

    public ngOnDestroy(): void {
        this.log.debug('ToolbarComponent: ngOnDestroy()');
        if (this.heightSubscription)
            this.heightSubscription.unsubscribe();
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