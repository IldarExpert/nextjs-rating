import Link from 'next/dist/client/link';
import React from 'react';
import styles from './footer.module.css';
import {FooterProps} from './footer.props';

const Footer = ({className, ...rest}: FooterProps): JSX.Element => {
  return (
    <footer
      className={`
        ${className}
        ${styles.footer}
      `}
      {...rest}
    >
      <div>OwlTop © 2020 - {(new Date()).getFullYear()} Все права защищены</div>
      <Link href={'/'}>Пользовательское соглашение</Link>
      <Link href={'#'}>Политика конфиденциальности</Link>
    </footer>
  );
};

export default Footer;
