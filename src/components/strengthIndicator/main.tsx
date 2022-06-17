import React from 'react';

import {useAnimation} from '../../hooks/animation';
import {strengthStyleLookup, strengthTextLookup} from './const';
import {StrengthIndex} from './type';


type Props = {
  index: StrengthIndex,
  animationDependencies?: React.DependencyList,
};

export const PxStrengthIndicator = ({index, animationDependencies}: Props) => {
  const elemRef = useAnimation({
    deps: animationDependencies || [index],
  });

  return (
    <span ref={elemRef} className={strengthStyleLookup[index]}>
      {strengthTextLookup[index]}
    </span>
  );
};
