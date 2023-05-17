import {User} from 'next-auth';


export const hideIfNotAdmin = (user: User | undefined): boolean => {
  return !user || !user.isAdmin;
};
