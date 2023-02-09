import NextAuth from 'next-auth';
import {OAuthConfig} from 'next-auth/providers/oauth';

import {AuthPath} from '../../../src/const/path';
import {CUSTOM_PROVIDER_ID} from '../../../src/types/auth/const';
import {UserModelOriginal} from '../../../src/types/auth/user';
import {refreshAccessToken} from '../../../src/utils/auth';


export const customOAuthBackend: OAuthConfig<UserModelOriginal> = {
  id: CUSTOM_PROVIDER_ID,
  name: 'KL Site',
  type: 'oauth',
  authorization: `${process.env.NEXTAUTH_URL}/auth/login`,
  token: `${process.env.NEXT_PUBLIC_API_URL}/auth/token`,
  userinfo: `${process.env.NEXT_PUBLIC_API_URL}/auth/me`,
  clientId: process.env.NEXTAUTH_CLIENT_ID,
  clientSecret: process.env.NEXTAUTH_CLIENT_SECRET,
  httpOptions: {
    // Default is 3500, which the API might not respond in-time, causing kick out
    timeout: 10000,
  },
  profile: (profile, tokens) => ({
    id: profile._id,
    username: profile.username,
    email: profile.email,
    isAdmin: profile.admin,
    expiry: profile.expiry && new Date(profile.expiry),
    permissions: profile.permissions,
    token: tokens.access_token,
  }),
};

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
// For detailed sample file, go to
// https://github.com/nextauthjs/next-auth-typescript-example/blob/main/pages/api/auth/%5B...nextauth%5D.ts
// eslint-disable-next-line new-cap
export default NextAuth({
  providers: [
    customOAuthBackend,
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  // UI customizations
  pages: {
    signIn: AuthPath.LOGIN_REDIRECT,
  },
  // Needed for custom user object as stated in the link below
  // https://github.com/nextauthjs/next-auth/discussions/2762#discussioncomment-1332952
  // Check the link below for auto token rotation
  // https://next-auth.js.org/tutorials/refresh-token-rotation
  callbacks: {
    jwt: async ({token, user, account}) => {
      // Patch user data to token object
      if (user) {
        token.user = user;
      }

      // Return previous token if not expired
      if ((Date.now() / 1000) < token.exp) {
        return token;
      }

      // Initial sign in
      if (account) {
        return token;
      }

      return refreshAccessToken(token);
    },
    session: async ({session, token}) => {
      session.user = token.user;
      session.error = token.error;

      return session;
    },
  },
});
