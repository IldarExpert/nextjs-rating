import { motion } from 'framer-motion';
import React from 'react';
import ArrowIcon from './arrow.svg';
import styles from './button.module.css';
import {ButtonProps} from './button.props';

const Button = ({appearance = 'primary', arrow, children, className, ...rest}: ButtonProps): JSX.Element => {

  return (
    <motion.button
      whileHover={{scale: 1.05}}
      className={`
                  ${styles.button}
                  ${appearance === 'primary' ? styles.primary : ''}
                  ${appearance === 'ghost' ? styles.ghost : ''}
                  ${className}
                 `}
      {...rest}
    >
      {children}
      {arrow && <span className={`
      ${styles.arrow}
      ${arrow === 'down' ? styles.arrowDown : ''}
      `}>
        <ArrowIcon/>
      </span>}
    </motion.button>
  );
};

export default Button;
