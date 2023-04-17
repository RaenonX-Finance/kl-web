import {UserInfo} from '../../models/token';


declare module 'fastify' {
  interface FastifyRequest {
    user: UserInfo
  }
}
