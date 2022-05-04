import React, {ForwardedRef, forwardRef, KeyboardEvent, useEffect, useState} from 'react';
import styles from './rating.module.css';
import {RatingProps} from './rating.props';
import StarIcon from './star.svg';

const Rating = forwardRef(({isEditable = true, rating, setRating, error, ...props}: RatingProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element => {
  const [currentRating, setCurrentRating] = useState<number>(rating);
  const starsArr = new Array(5).fill('');

  const handleDisplayRating = (rating: number) => {
    if (isEditable) {
      setCurrentRating(rating);
    }
  };

  const handleClickRating = (rating: number) => {
    if (isEditable && setRating) {
      setRating(rating);
    }
  };

  const handleKeyDown = (e: KeyboardEvent, rating: number) => {
    if (!isEditable || !setRating) {
      return;
    }

    if (e.code === 'Space') {
      setRating(rating);
    }
  };

  useEffect(() => {
    setCurrentRating(rating);
  }, [rating]);

  return (
    <div
      className={`
                  ${styles.rating}
                  ${error? styles.error: ''}
                 `}
      ref={ref}
      {...props}>
      {starsArr
        .map((ratingEl, i) => (
            <StarIcon
              key={i}
              className={`
                ${styles.star}
                ${isEditable ? styles.isEditable : ''}
                ${i < currentRating ? styles.filled : ''}
              `}
              onMouseEnter={() => handleDisplayRating(++i)}
              onMouseLeave={() => handleDisplayRating(rating)}
              onClick={() => handleClickRating(++i)}
              onKeyDown={(e: KeyboardEvent) => handleKeyDown(e, ++i)}
              tabIndex={isEditable ? 0 : -1}
            />
          )
        )}
      {error && <p className={styles.errorMessage}>{error.message}</p>}
    </div>
  );
});

export default Rating;
