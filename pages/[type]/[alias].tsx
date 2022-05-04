import axios from 'axios';
import {GetStaticPaths, GetStaticProps, GetStaticPropsContext} from 'next';
import Head from 'next/head';
import {ParsedUrlQuery} from 'querystring';
import React from 'react';
import TopPageComponent from '../../page-components/top-page-component/top-page-component';
import {API} from '../../helpers/api';
import {firstLevelMenu} from '../../helpers/helpers';
import {MenuItem} from '../../interfaces/menu.interface';
import {TopLevelCategory, TopPageModel} from '../../interfaces/page.interface';
import {ProductModel} from '../../interfaces/product.interface';
import {withLayout} from '../../layout/layout';

interface TopPageProps extends Record<string, unknown> {
  menu: MenuItem[],
  firstCategory: TopLevelCategory,
  page: TopPageModel,
  products: ProductModel[],
}

const TopPage = ({menu, page, products, firstCategory}: TopPageProps): JSX.Element => {
  return (
    <>
      <Head>
        <title>{page.metaTitle}</title>
        <meta name={'description'} content={page.metaDescription}/>
        <meta property={'og:title'} content={page.metaTitle}/>
        <meta property={'og:description'} content={page.metaDescription}/>
        <meta property={'og:type'} content={'website'}/>
      </Head>
      <TopPageComponent
        page={page}
        products={products}
        firstCategory={firstCategory}
      />;
    </>
  );
};

export default withLayout(TopPage);

export const getStaticPaths: GetStaticPaths = async () => {
  let paths: string[] = [];
  for (const el of firstLevelMenu) {
    const {data: menu} = await axios.post<MenuItem[]>(API.topPage.find, {
      firstCategory: el.id
    });
    paths = paths.concat(menu.flatMap((menu) => menu.pages.map((page) => `/${el.route}/${page.alias}`)));
  }

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<TopPageProps> = async ({params}: GetStaticPropsContext<ParsedUrlQuery>) => {
  if (!params) {
    return {
      notFound: true,
    };
  }

  const firstCategoryItem = firstLevelMenu.find((item) => item.route === params.type);

  if (!firstCategoryItem) {
    return {
      notFound: true,
    };
  }

  try {
    const {data: menu} = await axios.post<MenuItem[]>(API.topPage.find, {
      firstCategory: firstCategoryItem.id
    });
    const {data: page} = await axios.get<TopPageModel>(API.topPage.byAlias + params.alias);
    const {data: products} = await axios.post<ProductModel[]>(API.product.find, {
      category: page.category,
      limit: 10,
    });


    return {
      props: {
        menu,
        firstCategory: firstCategoryItem.id,
        page,
        products
      }
    };
  } catch (e) {
    return {
      notFound: true,
    };
  }
};
