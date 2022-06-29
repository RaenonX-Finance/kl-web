import {LastPriceAnimationMode} from 'lightweight-charts';


export const getAnimationMode = (enabled: boolean): LastPriceAnimationMode => (
  enabled ?
    LastPriceAnimationMode.OnDataUpdate :
    LastPriceAnimationMode.Disabled
);
