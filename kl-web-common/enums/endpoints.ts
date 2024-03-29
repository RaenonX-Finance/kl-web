export const ApiAuthEndpointPrefix = '/auth';

export enum PxApiPath {
  Ping = '/',
  PxInit = '/px-init',
  PxRequest = '/px-request',
  AppInit = '/app-init',
}

export enum InfoApiPath {
  Ping = '/',
  OptionsOi = '/auth/options-oi',
  FinancialEvents = '/auth/financial-events',
  FinancialEventHistory = '/financial-event-history',
}
