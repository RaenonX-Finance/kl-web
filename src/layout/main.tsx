import React from 'react';

import Container from 'react-bootstrap/Container';


type Props = {
  renderApp: () => React.ReactNode,
};

export const MainApp = ({renderApp}: Props) => {
  return (
    <Container fluid className="h-100">
      {renderApp()}
    </Container>
  );
};
