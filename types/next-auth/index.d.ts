import {UserModel} from '../../src/types/auth/user';


// Must use interface here
module 'next-auth' {
  interface User extends UserModel {}

  interface Session {
    user: User,
  }
}
