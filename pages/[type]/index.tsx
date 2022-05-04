import axios from 'axios';
import {GetStaticPaths, GetStaticProps, GetStaticPropsContext} from 'next';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {ParsedUrlQuery} from 'querystring';
import React from 'react';
import {API} from '../../helpers/api';
import {firstLevelMenu} from '../../helpers/helpers';
import Courses from '../../helpers/icons/courses.svg';
import {MenuItem} from '../../interfaces/menu.interface';
import {TopLevelCategory} from '../../interfaces/page.interface';
import {withLayout} from '../../layout/layout';
import styles from '../../styles/type.module.css';

interface TypeProps extends Record<string, unknown> {
  menu: MenuItem[],
  firstCategory: TopLevelCategory,
}

const Type = ({menu}: TypeProps): JSX.Element => {
  const router = useRouter();

  const title = firstLevelMenu.find((el) => `/${el.route}` === router.asPath);

  return (
    <div>
      <div className={styles.top}>
        <div className={styles.svgWrapper}>{title?.icon}</div>
        <span className={styles.title}>{title?.name}</span>
      </div>
      <ul className={styles.list}>
        {menu.map((menuItem) => (
          <li className={styles.menuItem} key={menuItem._id.secondCategory}>
            <p className={styles.menuItemTitle}>{menuItem._id.secondCategory}</p>
            <ul className={styles.menuItemList}>
              {menuItem.pages.map((menuItemEl) => (
                <li className={styles.menuItemEl} key={menuItemEl.alias}>
                  <Link href={`${router.asPath}/${menuItemEl.alias}`}>
                    <a>
                      {menuItemEl.category}
                    </a>
                  </Link>
                </li>
              ))}

            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default withLayout(Type);

export const getStaticPaths: GetStaticPaths = async () => {
    const paths: string[] = firstLevelMenu.map((el) => `/${el.route}`);

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<TypeProps> = async ({params}: GetStaticPropsContext<ParsedUrlQuery>) => {
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

    return {
      props: {
        menu,
        firstCategory: firstCategoryItem.id,
      }
    };
  } catch (e) {
    return {
      notFound: true,
    };
  }

};
