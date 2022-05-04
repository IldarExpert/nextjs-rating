import React from 'react';
import styles from './sort.module.css';
import {SortEnum, SortProps} from './sort.props';
import SortIcon from './sort.svg';

const Sort = ({sort, setSort, className, ...props}: SortProps): JSX.Element => {

  return (
    <div
      className={`${styles.sort} ${className}`}
      {...props}
    >
      <button
        className={`
                ${styles.sortItem}
                ${sort === SortEnum.Rating ? styles.active : ''}
        `}
        onClick={() => setSort(SortEnum.Rating)}
      >
        <SortIcon className={styles.sortIcon}/>
        По рейтингу
      </button>
      <button
        className={`
                ${styles.sortItem}
                ${sort === SortEnum.Price ? styles.active : ''}
        `}
        onClick={() => setSort(SortEnum.Price)}
      >
        <SortIcon className={styles.sortIcon}/>
        По цене
      </button>
    </div>
  );
};

export default Sort;
