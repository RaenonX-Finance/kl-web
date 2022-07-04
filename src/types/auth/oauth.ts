// Same structure as `OAuthToken` for the backend
export type RequestOAuth2TokenResponse = {
  access_token: string,
  token_type: 'bearer',
};
