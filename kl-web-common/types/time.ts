type ISOValue = string | number;

export type ISODateString = `${ISOValue}-${ISOValue}-${ISOValue}`;

export type ISOTimezoneString = `+${ISOValue}:${ISOValue}` | `-${ISOValue}:${ISOValue}`;

export type ISOTimestampTillMinuteNoZ = `${ISODateString}T${ISOValue}:${ISOValue}`;

export type ISOTimestampUtc =
  `${ISODateString}T${ISOValue}:${ISOValue}:${ISOValue}.${ISOValue}Z`;

export type ISOTimestampWithTimezone =
  `${ISODateString}T${ISOValue}:${ISOValue}:${ISOValue}.${ISOValue}${ISOTimezoneString}`;
