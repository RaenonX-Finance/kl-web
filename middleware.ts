export {default} from 'next-auth/middleware';

// Cannot use path const here as next-auth seems unable to handle it well - causes too manu redirects
export const config = {
  matcher: [
    '/',
    '/chart',
    '/info',
  ],
};
