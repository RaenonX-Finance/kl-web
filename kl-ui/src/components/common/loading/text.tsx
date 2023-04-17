import React from 'react';

import Spinner from 'react-bootstrap/Spinner';


type Props = {
  show: boolean,
};

export const TextWithLoading = ({show, children}: React.PropsWithChildren<Props>) => {
  return <>{show && <><Spinner size="sm" animation="border"/>&nbsp;</>}{children}</>;
};
