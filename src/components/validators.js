import {blockchain} from '../blockchain';

export const required = value => value ? undefined : 'Required';

export const addressValidator = value => blockchain.isValidAddress(value) ? undefined : 'Invalid Address';
