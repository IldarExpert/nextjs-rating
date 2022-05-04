import React from 'react';
import {priceRu} from '../../helpers/helpers';
import Card from '../card/card';
import {HhDataProps} from './hh-data.props';
import RateIcon from './rate.svg';
import styles from './hh-data.module.css';

const HhData = ({count, juniorSalary, middleSalary, seniorSalary}: HhDataProps): JSX.Element => {
  return (
    <div className={styles.hh}>
      <Card className={styles.cardCount}>
        <p className={styles.title}>Всего вакансий</p>
        <p className={styles.count}>{count}</p>
      </Card>
      <Card className={styles.cardSalary}>
        <div className={styles.salaryContext}>
          <p className={styles.title}>Начальный</p>
          <p className={styles.salary}>{priceRu(juniorSalary)} ₽</p>
          <div className={styles.rate}>
            <RateIcon className={styles.filled} />
            <RateIcon />
            <RateIcon />
          </div>
        </div>
        <div className={styles.salaryContext}>
          <p className={styles.title}>Средний</p>
          <p className={styles.salary}>{priceRu(middleSalary)} ₽</p>
          <div className={styles.rate}>
            <RateIcon className={styles.filled} />
            <RateIcon className={styles.filled} />
            <RateIcon />
          </div>
        </div>
        <div className={styles.salaryContext}>
          <p className={styles.title}>Профессионал</p>
          <p className={styles.salary}>{priceRu(seniorSalary)} ₽</p>
          <div className={styles.rate}>
            <RateIcon className={styles.filled} />
            <RateIcon className={styles.filled} />
            <RateIcon className={styles.filled} />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default HhData;
