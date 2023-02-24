import {GetServerSideProps} from 'next';
import {getProviders} from 'next-auth/react';

import {AuthLoginPage, AuthLoginPageProps} from '../../src/pages/auth/login/main';


export default AuthLoginPage;


export const getServerSideProps: GetServerSideProps<AuthLoginPageProps> = async () => ({
  props: {
    providers: await getProviders(),
  },
});
