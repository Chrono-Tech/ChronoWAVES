import Waves from 'waves.js/dist/waves';

export const blockchainParams = Waves.MainNetParameters();

export const client = new Waves(blockchainParams).client("https://nodes.wavesnodes.com");

