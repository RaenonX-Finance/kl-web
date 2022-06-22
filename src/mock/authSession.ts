import {UserModel} from '../types/auth/user';


const mockUserBody: UserModel = {
  id: 'MockID',
  name: 'MockUser',
  email: 'Mock@email.com',
  image: 'Image URL',
  isAdmin: false,
  memberExpiry: new Date(2025, 0, 1),
};

type NextAuthSessionBody = {
  user: UserModel,
};

type NextAuthSession = {
  data: NextAuthSessionBody,
  status: 'authenticated',
} | {
  data: null;
  status: 'unauthenticated' | 'loading',
};

export const useSession = (): NextAuthSession => {
  return {
    data: {
      user: mockUserBody,
    },
    status: 'authenticated',
  };
};
