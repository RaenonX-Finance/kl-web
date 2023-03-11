import {PxUniqueIdentifier} from 'kl-web-common/models/pxMeta';


export const identifiersToRooms = (identifiers: PxUniqueIdentifier[]) => {
  return [
    ...new Set(identifiers.map((identifier) => identifier.split('@')[0])),
    ...identifiers,
  ];
};
