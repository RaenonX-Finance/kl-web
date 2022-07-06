import NextAuth from 'next-auth';
import {OAuthConfig} from 'next-auth/providers/oauth';

import {AuthPath} from '../../../src/const/path';
import {CUSTOM_PROVIDER_ID} from '../../../src/types/auth/const';
import {UserModelOriginal} from '../../../src/types/auth/user';


export const customOAuthBackend: OAuthConfig<UserModelOriginal> = {
  id: CUSTOM_PROVIDER_ID,
  name: 'KL Site',
  type: 'oauth',
  authorization: `${process.env.NEXTAUTH_URL}/auth/login`,
  token: process.env.NEXT_PUBLIC_AUTH_URL_TOKEN,
  userinfo: 'http://localhost:8000/auth/me',
  clientId: process.env.NEXTAUTH_CLIENT_ID,
  clientSecret: process.env.NEXTAUTH_CLIENT_SECRET,
  profile: (profile) => ({
    id: profile._id,
    accountId: profile.account_id,
    email: profile.email,
    isAdmin: profile.admin,
    expiry: profile.expiry && new Date(profile.expiry),
    permissions: profile.permissions,
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
  callbacks: {
    session: async ({session, token}) => {
      session.user = token.user;
      return session;
    },
    jwt: async ({token, user}) => {
      if (user) {
        token.user = user;
      }
      return token;
    },
  },
});
