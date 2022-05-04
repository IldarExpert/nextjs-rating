import React, {ForwardedRef, forwardRef} from 'react';
import styles from './input.module.css';
import {InputProps} from './input.props';

const Input = forwardRef(({className, error, ...props}: InputProps, ref: ForwardedRef<HTMLInputElement>): JSX.Element => {
  return (
    <div className={`
                     ${styles.inputWrapper}
                     ${className}
                    `}>
      <input
        className={`
                    ${styles.input}
                    ${error? styles.error: ''}
        `}
        ref={ref}
        {...props}
      />
      {error && <p className={styles.errorMessage}>{error.message}</p>}
    </div>
  );
});

export default Input;
