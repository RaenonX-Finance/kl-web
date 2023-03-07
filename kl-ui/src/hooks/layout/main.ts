import React from 'react';

import {Dimension, UseLayoutReturn} from './type';


const getWindowDimensions = (): Dimension => {
  if (typeof window === 'undefined') {
    return {width: 0, height: 0};
  }

  const {innerWidth: width, innerHeight: height} = window;
  return {width, height};
};

export const useLayout = (): UseLayoutReturn => {
  const [dimension, setDimension] = React.useState(getWindowDimensions());
  const {width, height} = dimension;

  React.useEffect(() => {
    const onResize = () => {
      setDimension(getWindowDimensions());
    };

    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return {dimension, isLandscape: width / height > 1};
};
