// Same structure as `OAuthToken` for the backend
export type OAuth2TokenResponse = {
  access_token: string,
  token_type: 'bearer',
};
