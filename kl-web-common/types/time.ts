type ISOValue = string | number;

export type ISODateString = `${ISOValue}-${ISOValue}-${ISOValue}`;

export type ISOTimezoneString = `+${ISOValue}:${ISOValue}` | `-${ISOValue}:${ISOValue}`;

export type ISOTimestampWithTimezone =
  `${ISODateString}T${ISOValue}:${ISOValue}:${ISOValue}.${ISOValue}${ISOTimezoneString}`;
