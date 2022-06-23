import React from 'react';

import {useAnimation} from '../../hooks/animation';
import {strengthStyleLookup, strengthTextLookup} from './const';
import styles from './main.module.scss';
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
    <span ref={elemRef} className={`${styles['text-indicator']} ${strengthStyleLookup[index]}`}>
      {strengthTextLookup[index]}
    </span>
  );
};
