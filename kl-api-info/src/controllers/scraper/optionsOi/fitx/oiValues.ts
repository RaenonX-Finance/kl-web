import {AnyNode, Cheerio} from 'cheerio';
import {OptionsOiSingleSide} from 'kl-web-common/models/api/info/optionsOi';


export const getOiValues = (oiCell: Cheerio<AnyNode>): OptionsOiSingleSide => {
  const oiCurrent = oiCell
    .first()
    .contents()
    .filter((_, element) => element.type === 'text')
    .text()
    .trim();
  const oiChangeValue = oiCell
    .children('span')
    .text()
    .trim();

  return {
    oiCurrent: parseInt(oiCurrent),
    oiChangeVal: oiChangeValue === '-' ? 0 : parseInt(oiChangeValue),
  };
};
