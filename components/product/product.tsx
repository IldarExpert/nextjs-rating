import {motion} from 'framer-motion';
import Image from 'next/image';
import React, {ForwardedRef, forwardRef, useRef, useState} from 'react';
import {declOfNum, priceRu} from '../../helpers/helpers';
import Button from '../button/button';
import Card from '../card/card';
import Divider from '../divider/divider';
import Rating from '../rating/rating';
import ReviewForm from '../review-form/review-form';
import Review from '../review/review';
import Tag from '../tag/tag';
import styles from './product.module.css';
import {ProductProps} from './product.props';

const Product = motion(forwardRef(({
                                     product,
                                     className,
                                     ...props
                                   }: ProductProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element => {
  const [isReviewOpened, setIsReviewOpened] = useState<boolean>(false);
  const reviewRef = useRef<HTMLDivElement>(null);

  const handleOpenReview = () => {
    setIsReviewOpened((prev) => !prev);
  };

  const handleScrollToElement = (e) => {
    e.preventDefault();
    setIsReviewOpened(true);
    reviewRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
    reviewRef.current?.focus();
  };

  const variants = {
    visible: {
      opacity: 1,
      height: 'auto',
      marginTop: -30,
    },
    hidden: {
      opacity: 0,
      height: 0,
    },
  };

  return (
    <div
      className={`${className}`}
      ref={ref}
      {...props}
    >
      <Card
        className={`${styles.product}`}
      >
        <div className={styles.logo}>
          <Image
            // src={process.env.NEXT_PUBLIC_DOMAIN + product.image}
            src={/^https?:\/\//i.test(product.image) ? product.image : process.env.NEXT_PUBLIC_DOMAIN + product.image}
            alt={product.title}
            width={70}
            height={70}
          />
        </div>

        <div className={styles.title}>{product.title}</div>
        <div className={styles.price}>
          {`${priceRu(product.price)} ₽`}
          {product.oldPrice &&
            <Tag className={styles.oldPrice} color={'green'} size={'S'}>
              {priceRu(product.price - product.oldPrice)} ₽
            </Tag>}
        </div>
        <div className={styles.credit}>
          {`${priceRu(product.credit)} ₽`}<span>/мес</span>
        </div>
        <Rating
          className={styles.rating}
          rating={product.reviewAvg ?? product.initialRating}
        />
        <ul className={styles.categories}>
          {product.categories.map((category) => (
            <li key={category}>
              <Tag className={styles.category} color={'ghost'} size={'S'}>{category}</Tag>
            </li>
          ))}
        </ul>
        <div className={styles.priceTitle}>цена</div>
        <div className={styles.creditTitle}>в кредит</div>
        <div className={styles.rateTitle}>
          {product.reviewCount > 0 ?
            <a
              href={'#'}
              onClick={handleScrollToElement}
            >
              {product.reviewCount} {declOfNum(product.reviewCount, ['отзыв', 'отзыва', 'отзывов'])}
            </a>
            : <>{product.reviewCount} {declOfNum(product.reviewCount, ['отзыв', 'отзыва', 'отзывов'])}</>
          }
        </div>
        <Divider className={styles.hr}/>
        <div className={styles.description}>{product.description}</div>
        <ul className={styles.features}>
          {product.characteristics.map((characteristic) => (
            <li className={styles.characteristics} key={characteristic.name}>
              <span className={styles.characteristicName}>{characteristic.name}</span>
              <span className={styles.characteristicDots}/>
              <span className={styles.characteristicValue}>{characteristic.value}</span>
            </li>
          ))}
        </ul>
        <div className={styles.advBlock}>
          {product.advantages &&
            <div className={styles.advantages}>
              <p className={styles.advantagesTitle}>Преимущества</p>
              {product.advantages}
            </div>}
          {product.disAdvantages &&
            <div className={styles.disAdvantages}>
              <p className={styles.advantagesTitle}>Недостатки</p>
              {product.disAdvantages}
            </div>}
        </div>
        <Divider className={`${styles.hr} ${styles.hr2}`}/>
        <div className={styles.actions}>
          <Button appearance={'primary'}>Узнать подробнее</Button>
          <Button
            appearance={'ghost'}
            arrow={isReviewOpened ? 'down' : 'right'}
            onClick={handleOpenReview}
          >Читать отзывы</Button>
        </div>
      </Card>
      <motion.div
        variants={variants}
        initial={'hidden'}
        animate={isReviewOpened ? 'visible' : 'hidden'}
      >
        <Card
          className={`${styles.reviews}`}
          color={'blue'}
          ref={reviewRef}
          tabIndex={isReviewOpened ? 0: -1}
        >
          <ul className={styles.reviewsList}>
            {product.reviews.map((review) => (
              <li key={review._id}>
                <Review review={review}/>
                <Divider/>
              </li>
            ))}
          </ul>
          <ReviewForm isReviewOpened={isReviewOpened} productId={product._id}/>
        </Card>
      </motion.div>
    </div>
  )
    ;
}));

export default Product;
