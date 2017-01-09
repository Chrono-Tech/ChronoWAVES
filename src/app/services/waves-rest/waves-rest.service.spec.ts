import { Observable } from 'rxjs/Observable';

import {
    async,
    getTestBed,
    TestBed
} from '@angular/core/testing';

import {
    BaseRequestOptions,
    Http,
    Response,
    ResponseOptions,
    XHRBackend
} from '@angular/http';

import {
    MockBackend,
    MockConnection
} from '@angular/http/testing';

import {
    WavesRestService,
    BlockData
} from './waves-rest.service';

import {
    Config, TestNetConfig
} from '../config';

/**
 * Tests Suite
 */
describe('Service: WavesRestService', () => {
    let backend: MockBackend;
    let service: WavesRestService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                { provide: Config, useClass: TestNetConfig },
                BaseRequestOptions,
                MockBackend,
                WavesRestService,
                {
                    deps: [MockBackend, BaseRequestOptions],
                    provide: Http,
                    useFactory: (backend: XHRBackend, defaultOptions: BaseRequestOptions) => {
                        return new Http(backend, defaultOptions);
                    }
                }
            ]
        });
        const testbed = getTestBed();
        backend = testbed.get(MockBackend);
        service = testbed.get(WavesRestService);
    });
    // end beforeEach

    function setupConnections(backend: MockBackend, options: any) {
        backend.connections.subscribe((connection: MockConnection) => {
            const responseOptions = new ResponseOptions(options);
            const response = new Response(responseOptions);
            connection.mockRespond(response);
        });
    }

    it('should return a block at height', () => {
        setupConnections(backend, {
            body: {
                height: 1
            },
            status: 200
        });

        service.blockAt(1).subscribe((b: BlockData) => {
            expect(b.height).toBe(1);
        });
    });


    it('should log an error to the console', () => {
        setupConnections(backend, {
            body: { error: 'Server is down' },
            status: 500
        });
        spyOn(console, 'error');

        service.blockAt(1).subscribe(
            () => {
                fail(`This callback shouldn't have been called`);
            },
            () => {
                expect(console.error).toHaveBeenCalledWith('Server is down');
            },
            () => {
                fail(`This callback shouldn't have been called`);
            });
    });
});