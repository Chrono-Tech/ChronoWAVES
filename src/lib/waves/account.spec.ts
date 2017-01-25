import { Account } from './account';
import { MainNet } from './network';

describe('Waves: Account', () => {
    
    it('should create correct address for MainNet', () => {
        const seed = 'catch special brave relief toddler chest original improve ripple mango budget expect prosper always budget';
        const validAddress = '3PBCFocRdhr51zHSZFFGyuQVoJEWo3ydrjN';
        const account = Account.create(new MainNet(), seed);
        expect(account.address).toEqual(validAddress);
    });
});