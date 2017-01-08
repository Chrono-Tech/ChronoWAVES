export interface NetworkParameters {
    chainId: number;
}

export class TestNet implements NetworkParameters {
    chainId: number = 'T'.charCodeAt(0);
}

export class MainNet implements NetworkParameters {
    chainId: number = 'W'.charCodeAt(0);
}