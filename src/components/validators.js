import {blockchain} from '../blockchain';

export const required = value => value ? undefined : 'Required';

export const addressValidator = value => blockchain.isValidAddress(value) ? undefined : 'Invalid Address';

export const numberValidator = value => /^[+\-]?\d+(\.\d+)?$/.test(value) ? undefined : "Not a number";

export const positive = value => (value[0] != '-') ? undefined : "Should be positive number";
