import React from 'react';
import {ButtonIconProps, icons} from './button-icon.props';
import styles from './button-icon.module.css';

const ButtonIcon = ({icon, appearance, className, ...props} : ButtonIconProps): JSX.Element => {
  const IconComponent = icons[icon];

  return (
    <button className={`
                        ${styles.button}
                        ${className}
                        ${appearance === 'primary'? styles.primary: ''}
                        ${appearance === 'white'? styles.white: ''}
                       `}
            {...props}
    >
      <IconComponent />
    </button>
  );
};

export default ButtonIcon;
