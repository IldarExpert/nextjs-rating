import React from 'react';
import styles from './ptag.module.css';
import {PtagProps} from './ptag.props';

const Ptag = ({size = 'M', className, children, ...rest}: PtagProps): JSX.Element => {
  return (
    <p
      className={`
    ${className}
    ${styles.p}
    ${size === 'S' ? styles.sSize : ''}
    ${size === 'M' ? styles.mSize : ''}
    ${size === 'L' ? styles.lSize : ''}
    `}
      {...rest}
    >
      {children}
    </p>
  );
};

export default Ptag;
