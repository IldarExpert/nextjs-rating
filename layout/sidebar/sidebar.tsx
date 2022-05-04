import Link from 'next/link';
import React from 'react';
import Search from '../../components/search/search';
import Logo from '../logo.svg';
import Menu from '../menu/menu';
import styles from './sidebar.module.css';
import {SidebarProps} from './sidebar.props';

const Sidebar = ({className, ...rest}: SidebarProps): JSX.Element => {
  return (
    <div className={`
      ${className ? className : ''}
      ${styles.sidebar}
    `} {...rest}>
      <Link href={'/'}>
        <a><Logo className={styles.logo}/></a>
      </Link>
      <Search/>
      <Menu/>
    </div>
  );
};

export default Sidebar;
