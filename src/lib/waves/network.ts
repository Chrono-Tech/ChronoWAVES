export interface NetworkParameters {
    chainId: number;
}

export class TestNet implements NetworkParameters {
    chainId: number = 'T'.charCodeAt(0);
}