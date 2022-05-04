import React, {useEffect, useReducer} from 'react';
import Advantages from '../../components/advantages/advantages';
import HhData from '../../components/hh-data/hh-data';
import Htag from '../../components/htag/htag';
import Product from '../../components/product/product';
import Sort from '../../components/sort/sort';
import {SortEnum} from '../../components/sort/sort.props';
import TagList from '../../components/tag-list/tag-list';
import Tag from '../../components/tag/tag';
import {TopLevelCategory} from '../../interfaces/page.interface';
import {sortReducer} from './sort.reducer';
import styles from './top-page-component.module.css'
import {TopPageComponentProps} from './top-page-component.props';

const TopPageComponent = ({page, products, firstCategory}: TopPageComponentProps): JSX.Element => {
  const [{products: sortedProduct, sort}, dispatchSort] = useReducer(
    sortReducer, {products, sort: SortEnum.Rating}
  );

  const sortHandle = (sort: SortEnum.Price | SortEnum.Rating) => {
    dispatchSort({type: sort});
  };

  useEffect(() => {
    dispatchSort({type: SortEnum.Reset, payload: products});
  }, [products]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.top}>
        <Htag tag={'h1'}>{page.title}</Htag>
        {sortedProduct && <Tag color={'grey'} size={'M'}>{sortedProduct.length}</Tag>}
        <Sort sort={sort} setSort={sortHandle}/>
      </div>
      <ul className={styles.products}>
        {sortedProduct.map((product) => (
          <li key={product._id}><Product layout={true} product={product}/></li>
        ))}
      </ul>
      <div className={styles.hhTitle}>
        <Htag tag={'h2'}>Вакансии - {page.category}</Htag>
        <Tag color={'red'} size={'M'}>hh.ru</Tag>
      </div>
      {firstCategory === TopLevelCategory.Courses && <HhData {...page.hh}/>}
      {page.advantages.length > 0 && <Advantages advantages={page.advantages}/>}
      {page.seoText && <div className={styles.seoText} dangerouslySetInnerHTML={{__html: page.seoText}}/>}
      {page.tags && <TagList tags={page.tags}/>}
    </div>
  );
};

export default TopPageComponent;
