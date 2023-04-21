import React from 'react';

import {OptionsOiData} from 'kl-web-common/models/api/info/optionsOi';
import Alert from 'react-bootstrap/Alert';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import {OptionsOiChartSingle} from './single';
import {updateOptionsOiTitle} from '../../../../../../utils/title';


type Props = {
  data: OptionsOiData,
};

export const OptionsOiChart = ({data}: Props) => {
  if (!data.length) {
    return (
      <Alert variant="danger">
        無選擇權 OI 資料可供顯示。
      </Alert>
    );
  }

  const initialContractSymbol = data.at(0)?.contractSymbol;

  React.useEffect(() => {
    updateOptionsOiTitle(initialContractSymbol);
  }, []);

  return (
    <Tabs defaultActiveKey={initialContractSymbol} onSelect={updateOptionsOiTitle}>
      {data.map((dataOfContract) => (
        <Tab
          key={dataOfContract.contractSymbol} className="mt-2"
          eventKey={dataOfContract.contractSymbol} title={dataOfContract.contractSymbol}
        >
          <OptionsOiChartSingle data={dataOfContract}/>
        </Tab>
      ))}
    </Tabs>
  );
};
