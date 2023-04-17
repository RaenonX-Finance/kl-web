import React from 'react';


export type PanelTab<K extends string, P extends string> = {
  tabKey: K,
  name: string,
  link: P,
  Component: React.FunctionComponent,
};
