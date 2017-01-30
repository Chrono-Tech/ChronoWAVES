export as namespace axlsign;

interface KeyPair {
  private: Uint8Array; // 32-byte private key
  public: Uint8Array;  // 32-byte public key
}

/**
 * Generates a new key pair from the given 32-byte secret seed
 * (which should be generated with a CSPRNG) and returns it as object
 */
export function generateKeyPair(seed: Uint8Array): KeyPair;

/**
 * Verifies the given signature for the message using the given public key.
 * Returns true if the signature is valid, false otherwise.
 */
export function verify(publicKey: Uint8Array, message: Uint8Array, signature: Uint8Array): boolean;


