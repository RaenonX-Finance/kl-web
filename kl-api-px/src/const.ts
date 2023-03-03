import {MongoClient} from 'mongodb';
import {createClient} from 'redis';

import {RedisDbId} from './enums/redisDb';
import {MongoUri} from './env';
import {buildGrpcService} from './init/grpc/build';
import {buildRestApi} from './init/rest/build/main';


export const RestApiServer = buildRestApi();

export const GrpcService = buildGrpcService();

export const Logger = RestApiServer.log;

export const Mongo = new MongoClient(MongoUri, {});

export const RedisLastPx = createClient({database: RedisDbId.LastPxAndMomentum});