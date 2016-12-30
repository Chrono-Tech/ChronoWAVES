import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import 'rxjs/add/operator/map';

import { BlockData } from './responses';

export * from './responses';

/**
 * Performs HTTP Rest requests to Waves fullnode API
 */
@Injectable()
export class WavesRestService {
    private api: ApiMethods = new ApiMethods('');

    constructor(private http: Http) { }

    blockAt(height: number): Observable<BlockData> {
        return this.http.get(this.api.blockAt(height))
            .map((response) => {
                if (response.ok) {
                    return response.json() as BlockData;
                } else {
                    return this.logError(response);
                }
            });
    }

    private logError(error: any): ErrorObservable<any> {
        try {
            error = error.json();
            console.error(error.error);
        } catch (e) {
            console.error(error);
        }
        return Observable.throw(error);
    }
}

class ApiMethods {
    constructor(private baseUri: string) {}

    blockAt(height: number): string {
        return `${this.baseUri}/blocks/at/${height}`;
    }
}

