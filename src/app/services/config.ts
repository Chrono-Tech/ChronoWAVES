export abstract class Config {
    restApiUrl: string;
}

export class TestNetConfig implements Config {
    restApiUrl: string = 'http://52.30.47.67:6869';
}