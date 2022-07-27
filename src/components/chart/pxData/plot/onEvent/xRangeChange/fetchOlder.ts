import {HandleXrangeChangeOpts} from './type';


export const handleXrangeChangeFetchOlder = ({e, barsInfo}: HandleXrangeChangeOpts) => {
  if (!barsInfo || barsInfo.barsBefore > 50) {
    return;
  }

  const {requestPxData} = e;

  requestPxData(e.chartDataRef.current.data.length);
};
