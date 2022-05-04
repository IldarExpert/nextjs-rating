import React from 'react';
import styles from './tag.module.css';
import {TagProps} from './tag.props';

const Tag = ({color, size, href, className, children, ...rest}: TagProps): JSX.Element => {
  return (
    <div
      className={`
        ${styles.tag}
        ${color === 'primary'? styles.primary: ''}
        ${color === 'ghost'? styles.ghost: ''}
        ${color === 'green'? styles.green: ''}
        ${color === 'red'? styles.red: ''}
        ${color === 'grey'? styles.grey: ''}
        ${size === 'S'? styles.sSize: ''}
        ${size === 'M'? styles.mSize: ''}
        ${className? className: ''}
    `}
      {...rest}
    >
      {
        href ?
          <a href={href}>{children}</a> :
          <>{children}</>
      }
    </div>
  );
};

export default Tag;
