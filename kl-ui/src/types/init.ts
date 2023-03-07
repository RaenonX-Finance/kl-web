import {UserConfigModel} from './user';


/**
 * Initial data sent from the account backend.
 *
 * This should have the same schema as `InitData` in the account backend.
 */
export type InitAccountData = {
  config: UserConfigModel,
};
