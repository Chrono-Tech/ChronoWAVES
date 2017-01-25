import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import 'rxjs/add/operator/map';

import { BlockData, TransactionData } from './responses';
import { Config } from '../config';

export * from './responses';

/**
 * Performs HTTP Rest requests to Waves fullnode API
 */
@Injectable()
export class WavesRestService {
    private api: ApiMethods;

    constructor(private http: Http, private config: Config) {
        this.api = new ApiMethods(config.restApiUrl);
    }

    blockAt(height: number): Observable<BlockData> {
        return this.http.get(this.api.blockAt(height))
            .map((response) => {
                if (response.ok) {
                    return response.json() as BlockData;
                } else {
                    this.logError(response);
                }
            });
    }

    height(): Observable<number> {
        return this.http.get(this.api.height)
            .map((response) => {
                if (response.ok) {
                    return response.json()['height'] as number;
                } else {
                    this.logError(response);
                }
            });
    }

    unconfirmedTxs() : Observable<TransactionData[]> {
        return this.http.get(this.api.unconfirmedTxs)
        .map((response) => {
            if (response.ok) {
                return response.json() as TransactionData[];
            } else {
                this.logError(response);
            }
        });
    }

    private logError(error: any) {
        try {
            error = error.json();
            console.error(error.error);
        } catch (e) {
            console.error(error);
        }
        throw new Error(error);
        //return Observable.throw(error);
    }
}

class ApiMethods {
    constructor(private baseUri: string) { }

    blockAt(height: number): string {
        return `${this.baseUri}/blocks/at/${height}`;
    }

    height: string = `${this.baseUri}/blocks/height`;

    unconfirmedTxs: string = `${this.baseUri}/transactions/unconfirmed`;
}

