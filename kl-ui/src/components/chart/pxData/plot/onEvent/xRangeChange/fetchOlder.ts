import {HandleXrangeChangeOpts} from './type';


export const handleXrangeChangeFetchOlder = ({e, barsInfo}: HandleXrangeChangeOpts) => {
  if (!barsInfo || barsInfo.barsBefore > 100) {
    return;
  }

  const {requestPxData} = e;

  requestPxData(e.chartData.data.length);
};
