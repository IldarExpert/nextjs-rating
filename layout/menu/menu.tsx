import {motion} from 'framer-motion';
import Link from 'next/link';
import {useRouter} from 'next/router';
import React, {useContext, KeyboardEvent} from 'react';
import {AppContext} from '../../context/app.context';
import {firstLevelMenu} from '../../helpers/helpers';
import {FirstLevelMenuItem, PageItem} from '../../interfaces/menu.interface';
import styles from './menu.module.css';

const Menu = (): JSX.Element => {
  const {menu, setMenu, firstCategory} = useContext(AppContext);
  const router = useRouter();

  const handleSecondLevelClick = (secondCategory) => {
    setMenu && setMenu(menu.map((menuItem) => {
      if (menuItem._id.secondCategory === secondCategory) {
        menuItem.isOpen = !menuItem.isOpen;
      }

      return menuItem;
    }));
  };

  const handleSecondLevelKeySown = (key, secondCategory) => {
    if (key.code === 'Enter' || key.code === 'Space') {
      key.preventDefault();
      handleSecondLevelClick(secondCategory);
    }
  };

  const variants = {
    visible: {
      display: 'grid',
      marginBottom: 10,
      transition: {
        when: 'beforeChildren',
        staggerChildren: 0.1,
      }
    },
    hidden: {
      display: 'block',
      marginBottom: 0
    }
  };

  const variantsChildren = {
    visible: {
      opacity: 1,
      height: 'auto',
    },
    hidden: {
      opacity: 0,
      height: 0,
    }
  };

  const buildFirstCategory = () => {
    return (
      <ul className={`${styles.firstLevelList}`}>
        {firstLevelMenu.map((firstLevelMenu) => (
          <li key={firstLevelMenu.route}>
            <Link href={`/${firstLevelMenu.route}`}>
              <a className={`
                ${styles.firstLevel}
                ${firstLevelMenu.id === firstCategory ? styles.firstLevelActive : ''}
              `}>
                {firstLevelMenu.icon}
                <span>{firstLevelMenu.name}</span>
              </a>
            </Link>
            {firstLevelMenu.id === firstCategory && buildSecondCategory(firstLevelMenu)}
          </li>
        ))}
      </ul>
    );
  };

  const buildSecondCategory = (menuItem: FirstLevelMenuItem) => {
    return (
      <ul className={`${styles.secondLevelList}`}>
        {menu.map((secondLevelMenu) => {
          const isOpen = secondLevelMenu.pages.find((item) => (
            item.alias === router.asPath.split('/')[2])
          );
          if (isOpen) secondLevelMenu.isOpen = true;

          return (
            <li key={secondLevelMenu._id.secondCategory}
                className={`${secondLevelMenu.isOpen ? styles.secondLevelOpened : ''}`}>
              <button
                className={`${styles.secondLevel}`}
                onClick={() => handleSecondLevelClick(secondLevelMenu._id.secondCategory)}
                onKeyDown={(e: KeyboardEvent) => handleSecondLevelKeySown(e, secondLevelMenu._id.secondCategory)}
              >
                {secondLevelMenu._id.secondCategory}
              </button>
              {buildThirdCategory(secondLevelMenu.pages, menuItem.route, secondLevelMenu.isOpen)}
            </li>
          );
        })}
      </ul>
    );
  };

  const buildThirdCategory = (pages: PageItem[], route: string, isOpen: boolean | undefined) => {

    return (
      <motion.ul
        className={`${styles.thirdLevelList}`}
        layout={true}
        variants={variants}
        initial={isOpen? 'visible' : 'hidden'}
        animate={isOpen? 'visible' : 'hidden'}
      >
        {pages.map((page) => (
          <motion.li
            key={page._id}
            variants={variantsChildren}
          >
            <Link href={`/${route}/${page.alias}`}>
              <a
                className={`
                            ${styles.thirdLevel}
                            ${
                            router.asPath === `/${route}/${page.alias}`
                              ? styles.thirdLevelActive
                              : ''}
                          `}
                tabIndex={isOpen? 0: -1}
              >
                {page.category}
              </a>
            </Link>
          </motion.li>
        ))}
      </motion.ul>
    );
  };

  return (
    <nav className={styles.menu}>
      {buildFirstCategory()}
    </nav>
  );
};

export default Menu;
