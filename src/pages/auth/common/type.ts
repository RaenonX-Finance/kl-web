import {authErrorTranslation} from './const';


// Exact error message returned from the backend
export type LoginErrorDetail = keyof typeof authErrorTranslation;

export const isTranslatedErrorDetail = (detail: string | undefined | null): detail is LoginErrorDetail => {
  if (!detail) {
    return false;
  }

  return Object.keys(authErrorTranslation).includes(detail);
};
