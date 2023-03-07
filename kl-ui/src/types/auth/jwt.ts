/**
 * JWT returned from the backend.
 *
 * This should match the schema of `JwtDataDict` from the backend.
 */
export type UserJwt = {
  /**
   * Username.
   */
  sub: string,
  /**
   * JWT expiry in epoch second.
   */
  exp: number,
};
