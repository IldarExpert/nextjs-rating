import {motion} from 'framer-motion';
import {useRouter} from 'next/router';
import React, {useEffect, useState} from 'react';
import ButtonIcon from '../../components/button-icon/button-icon';
import LogoIcon from '../logo.svg';
import Sidebar from '../sidebar/sidebar';
import styles from './header.module.css';
import {HeaderProps} from './header.props';

const Header = ({className, ...props}: HeaderProps): JSX.Element => {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    setIsOpened(false);
  }, [router]);

  const variants = {
    visible: {
      opacity: 1,
      x: '0',
      zIndex: 12,
      transition: {
        stiffness: 20,
      }
    },
    hidden: {
      opacity: 0,
      x: '100%',
    },
  };

  return (
    <header
      className={`${className} ${styles.header}`}
      {...props}
    >
      <LogoIcon/>
      <ButtonIcon
        className={styles.menuOpen}
        icon={'menu'}
        appearance={'white'}
        onClick={() => setIsOpened(true)}
      />
      <motion.div
        className={styles.mobileMenu}
        variants={variants}
        initial={'hidden'}
        animate={isOpened? 'visible' : 'hidden'}
      >
        <Sidebar/>
        <ButtonIcon
          className={styles.menuClose}
          icon={'close'}
          appearance={'white'}
          onClick={() => setIsOpened(false)}
        />
      </motion.div>
    </header>
  );
};

export default Header;
