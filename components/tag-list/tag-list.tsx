import React from 'react';
import Htag from '../htag/htag';
import Tag from '../tag/tag';
import {TagListProps} from './tag-list.props';
import styles from './tag-list.module.css';

const TagList = ({tags}: TagListProps): JSX.Element => {
  return (
    <div className={styles.wrapper}>
      <Htag tag={'h2'}>Получаемые навыки</Htag>
      <ul className={styles.list}>
        {tags.map((tag) => (
          <li key={tag}>
            <Tag color={'primary'} size={'S'}>{tag}</Tag>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TagList;
