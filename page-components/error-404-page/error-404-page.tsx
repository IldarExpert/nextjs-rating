import Link from 'next/link';
import React from 'react';
import Htag from '../../components/htag/htag';
import styles from './error-404-page.module.css';

export const Error404Page = (): JSX.Element => {
  return (
    <div className={styles.wrapper}>
      <Htag tag={'h1'}>Ошибка 404</Htag>
      <div>
        Такой страницы не существует, перейдите на <Link href={'/'}>
        <a className={styles.link}>главную страницу</a>
      </Link>
      </div>
    </div>
  );
};

export default Error404Page;
