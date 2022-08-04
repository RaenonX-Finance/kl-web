export type ISODateString = `${number}-${number}-${number}`;

export type ISOTimestampWithTimezone = `${ISODateString}T${number}:${number}:${number}.${number}+${number}:${number}`;
