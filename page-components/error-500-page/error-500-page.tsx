import React from 'react';
import Htag from '../../components/htag/htag';
import styles from './error-500-page.module.css';

export const Error500Page = (): JSX.Element => {
  return (
    <div className={styles.wrapper}>
      <Htag tag={'h1'}>Ошибка 500</Htag>
      <div>
        Сервис временно недоступен, попробуйте повторить попытку позже.
      </div>
    </div>
  );
};

export default Error500Page;
