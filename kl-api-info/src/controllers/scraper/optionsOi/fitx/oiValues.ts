import {AnyNode, Cheerio} from 'cheerio';
import {OptionsOiSingleSide} from 'kl-web-common/models/api/info/optionsOi';
import {getNumber} from 'kl-web-common/utils/parse';


export const getOiValues = (oiCell: Cheerio<AnyNode>): OptionsOiSingleSide => {
  const oiCurrent = getNumber({
    str: oiCell
      .first()
      .contents()
      .filter((_, element) => element.type === 'text')
      .text()
      .trim(),
    onNaNReturn: NaN,
  });
  const oiChangeVal = getNumber({
    str: oiCell
      .children('span')
      .text()
      .trim(),
    onNaNReturn: 0,
  });

  return {oiCurrent, oiChangeVal};
};
