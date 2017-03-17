

export const required = value => value ? undefined : 'Required';

/**
 * Carried function returns validator
 *
 * @param blockchain
 */
export const addressValidator = (blockchain) => (value => blockchain.isValidAddress(value) ? undefined : 'Invalid Address');

export const numberValidator = value => /^[+\-]?\d+(\.\d+)?$/.test(value) ? undefined : "Not a number";

export const decimalsValidator = (decimals) => value => {
  const re = (decimals > 0) ?
    `^[+\\-]?\\d+(\\.\\d{1,${decimals}})?$`:
    `^[+\\-]?\\d+$`;

  if (new RegExp(re).test(value))
    return undefined;

  if (decimals === 0)
    return 'Only integer values allowed for this asset';

  return `Only ${decimals} decimals allowed for this asset`;
};

export const positive = value => (value[0] != '-') ? undefined : "Should be positive number";
