export enum GeneralPath {
  CHART = '/',
  ACCOUNT_INFO = '/info',
}

export enum AuthPath {
  LOGIN = '/auth/login',
  LOGIN_REDIRECT = '/auth/login-redirect',
}

export type PagePath = GeneralPath | AuthPath;

export const allPaths = ([] as Array<PagePath>).concat(
  ...[GeneralPath, AuthPath].map(
    (paths) => Object.values(paths),
  ),
);

export const isPagePath = (path: string): path is PagePath => {
  return allPaths.includes(path as PagePath);
};
