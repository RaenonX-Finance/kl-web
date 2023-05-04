import {data} from './data';


export const countryToEmoji : {[country in string]: string} = Object.fromEntries(
  data.map(({country, emoji}) => [country, emoji]),
);
