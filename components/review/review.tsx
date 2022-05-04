import {format} from 'date-fns';
import {ru} from 'date-fns/locale';
import React from 'react';
import Divider from '../divider/divider';
import Rating from '../rating/rating';
import styles from './review.module.css';
import {ReviewProps} from './review.props';
import UserIcon from './user.svg';

const Review = ({review, className, ...props}: ReviewProps): JSX.Element => {

  return (
    <div
      className={`${className} ${styles.review}`}
      tabIndex={-1}
      {...props}
    >
      <UserIcon className={styles.userIcon}/>
      <div className={styles.titleWrapper}>
        <span className={styles.name}>{review.name}:&nbsp;&nbsp;</span>
        <span className={styles.title}>{review.title}</span>
      </div>
      <span className={styles.date}>
        {format(new Date(review.createdAt), 'dd MMMM yyyy', {locale: ru})}
      </span>
      <span className={styles.rating}><Rating rating={review.rating}/></span>
      <span className={styles.description}>{review.description}</span>
    </div>
  );
};

export default Review;
