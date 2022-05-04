import React, {ForwardedRef, forwardRef} from 'react';
import styles from './textarea.module.css';
import {TextareaProps} from './textarea.props';

const Textarea = forwardRef(({className='', error, ...props}: TextareaProps,
                             ref: ForwardedRef<HTMLTextAreaElement>): JSX.Element => {
  return (
    <div className={`
                     ${styles.textareaWrapper}
                     ${className}
                    `}>
      <textarea
        className={`
                    ${styles.textarea}
                    ${error? styles.error: ''}
                    `}
        ref={ref}
        {...props}
      />
      {error && <p className={styles.errorMessage}>{error.message}</p>}
    </div>
  );
});

export default Textarea;
