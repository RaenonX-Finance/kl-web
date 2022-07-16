import React from 'react';

import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

import {useNextAuthCall} from '../../../hooks/auth';
import {TextWithLoading} from '../../common/loading/text';


export const LoginRequired = () => {
  const [disabled, setDisabled] = React.useState(false);
  const {signIn} = useNextAuthCall();

  const onClick = async () => {
    setDisabled(true);
    signIn();
  };

  return (
    <div className="h-100 d-flex flex-column align-items-center justify-content-center">
      <Alert variant="danger">
        <p className="h4">
          此功能需要先登入才可使用。
        </p>
        <hr/>
        <div className="d-flex justify-content-end">
          {/* Specify provider `KL-Site` do directly go to the webpage with providers and default login */}
          <Button variant="outline-danger" onClick={onClick} disabled={disabled}>
            <TextWithLoading show={disabled} text="點此登入"/>
          </Button>
        </div>
      </Alert>
    </div>
  );
};
