import React from 'react';


export type PanelTabComponentProps = {
  isActive?: boolean,
};

export type PanelTab<K extends string, P extends string> = {
  tabKey: K,
  name: string,
  link: P,
  Component: React.FunctionComponent<PanelTabComponentProps>,
};
