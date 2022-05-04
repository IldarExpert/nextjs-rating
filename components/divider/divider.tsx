import React from 'react';
import {DividerProps} from './divider.props';
import styles from './divider.module.css';

const Divider = ({className, ...props}: DividerProps): JSX.Element => {
  return (
    <hr
      className={`${className} ${styles.hr}`}
      {...props}
    />
  );
};

export default Divider;
