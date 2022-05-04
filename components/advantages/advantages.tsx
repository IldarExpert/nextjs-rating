import React from 'react';
import Htag from '../htag/htag';
import styles from './advantages.module.css';
import {AdvantagesProps} from './advantages.props';
import MarkIcon from './mark.svg';

const Advantages = ({advantages}: AdvantagesProps): JSX.Element => {
  return (
    <div className={styles.wrapper}>
      <Htag tag={'h2'}>Преимущества</Htag>
      <ul className={styles.advantages}>
        {advantages.map((advantage) => (
          <li className={styles.advantage} key={advantage._id}>
            <MarkIcon/>
            <Htag tag={'h3'}>{advantage.title}</Htag>
            <div className={styles.line} />
            <p>{advantage.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Advantages;
