export enum GeneralPath {
  CHART = '/',
  ACCOUNT_INFO = '/account/info',
}

export enum SmcAnalysisPath {
  OPTIONS_OI = '/smc/options-oi',
  FINANCIAL_EVENTS = '/smc/financial-events',
}

export enum AdminPath {
  GENERATE_SIGNUP_KEY = '/admin/signup-key',
  ACCOUNT_VIEW = '/admin/account-view',
  MARKET_SESSION = '/admin/market-session',
}

export enum AuthPath {
  LOGIN = '/auth/login',
  LOGIN_REDIRECT = '/auth/login-redirect',
  SIGNUP = '/auth/signup',
}

export type PagePathAdminOnly = AdminPath;

export type PagePathNormal = GeneralPath | SmcAnalysisPath;

export type PagePath = PagePathNormal | PagePathAdminOnly | AuthPath;

export const allPaths = ([] as Array<PagePath>).concat(
  ...[GeneralPath, SmcAnalysisPath, AdminPath, AuthPath].map(
    (paths) => Object.values(paths),
  ),
);

export const isPagePath = (path: string): path is PagePath => {
  return allPaths.includes(path as PagePath);
};
