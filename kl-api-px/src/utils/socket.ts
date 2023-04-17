import {PxUniqueIdentifier} from 'kl-web-common/models/api/px/pxMeta';
import {getIdentifierDetails} from 'kl-web-common/utils/pxModel';


export const identifiersToRooms = (identifiers: PxUniqueIdentifier[]) => {
  return [
    ...new Set(identifiers.map((identifier) => getIdentifierDetails(identifier).symbol)),
    ...identifiers,
  ];
};
