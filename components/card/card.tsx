import React, {ForwardedRef, forwardRef} from 'react';
import styles from './card.module.css';
import {CardProps} from './card.props';

const Card = forwardRef(({color = 'white', className, children, ...props}: CardProps, ref:ForwardedRef<HTMLDivElement>): JSX.Element => {
  return (
    <div
      className={`
                ${className}
                ${styles.card}
                ${color === 'blue' ? styles.blue : ''}
                `}
      ref={ref}
      {...props}
    >
      {children}
    </div>
  );
});

export default Card;
