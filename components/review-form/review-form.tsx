import axios from 'axios';
import React, {useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {API} from '../../helpers/api';
import Button from '../button/button';
import Input from '../input/input';
import Rating from '../rating/rating';
import Textarea from '../textarea/textarea';
import CloseIcon from './close.svg';
import {IReviewForm, IReviewResponse} from './review-form.interface';
import styles from './review-form.module.css';
import {ReviewFormProps} from './review-form.props';

const ReviewForm = ({productId, isReviewOpened, className, ...props}: ReviewFormProps): JSX.Element => {
  const {register, handleSubmit, control, formState: {errors}, reset} = useForm<IReviewForm>();
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isError, setError] = useState<string>();

  const OnSubmit = async (formData: IReviewForm) => {
    try {
      const {data} = await axios.post<IReviewResponse>(API.review.createDemo, {
        ...formData, productId,
      });

      if (data.message) {
        setIsSuccess(true);
        reset();
      } else {
        setError('Что то пошло не так');
      }
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      }
    }

  };

  return (
    <form
      onSubmit={handleSubmit(OnSubmit)}
    >
      <div
        className={`${className} ${styles.reviewForm}`}
        {...props}
      >
        <Input
          {...register('name', {
            required: {
              value: true,
              message: '* Заполните имя',
            }
          })}
          error={errors.name}
          placeholder={'Имя'}
          tabIndex={isReviewOpened ? 0 : -1}
        />
        <Input
          {...register('title', {
            required: {
              value: true,
              message: '* Заполните заголовок',
            }
          })}
          error={errors.title}
          placeholder={'Заголовок отзыва'}
          tabIndex={isReviewOpened ? 0 : -1}
        />
        <div className={styles.ratingWrapper}>
          <span>Оценка:</span>
          <Controller
            name={'rating'}
            control={control}
            rules={{
              required: {
                value: true,
                message: '* Поставьте оценку'
              }
            }}
            render={({field}) => (
              <Rating
                isEditable={isReviewOpened}
                rating={field.value}
                setRating={field.onChange}
                error={errors.rating}
                tabIndex={isReviewOpened ? 0 : -1}
              />
            )}
          />

        </div>
        <Textarea
          {...register('description', {
            required: {
              value: true,
              message: '* Заполните текст отзыва'
            }
          })}
          error={errors.description}
          className={styles.textarea}
          placeholder={'Текст отзыва'}
          tabIndex={isReviewOpened ? 0 : -1}
        />
        <div className={styles.submit}>
          <Button
            type={'submit'}
            className={styles.button}
            appearance={'primary'}
            tabIndex={isReviewOpened ? 0 : -1}
          >Отправить</Button>
          <span>* Перед публикацией отзыв пройдет предварительную модерацию и проверку</span>
        </div>
      </div>
      {isSuccess && <div className={`${styles.success} ${styles.panel}`}>
        <p className={styles.successTitle}>Ваш отзыв отправлен!</p>
        <p className={styles.successDescription}>
          Спасибо! Ваш отзыв будет опубликован после проверки.
        </p>
        <CloseIcon
          className={styles.closeIcon}
          onClick={() => setIsSuccess(false)}
        />
      </div>}
      {isError && <div className={`${styles.error} ${styles.panel}`}>
        <p className={styles.successTitle}>Что то пошло не так...</p>
        <p className={styles.successDescription}>
          Попробуйте отправить отзыв позже.
        </p>
        <CloseIcon
          className={styles.closeIcon}
          onClick={() => setError(undefined)}
        />
      </div>}
    </form>
  );
};

export default ReviewForm;
