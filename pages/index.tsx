import axios from 'axios';
import type {GetStaticProps} from 'next';
import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';
import Button from '../components/button/button';
import Htag from '../components/htag/htag';
import Input from '../components/input/input';
import Ptag from '../components/ptag/ptag';
import Rating from '../components/rating/rating';
import Tag from '../components/tag/tag';
import Textarea from '../components/textarea/textarea';
import {API} from '../helpers/api';
import {MenuItem} from '../interfaces/menu.interface';
import {withLayout} from '../layout/layout';

interface HomeProps extends Record<string, unknown> {
  menu: MenuItem[],
  firstCategory: number,
}

const Home = ({menu}: HomeProps): JSX.Element => {
  const router = useRouter();

  useEffect(() => {
    router.push('/courses');
  }, [router]);



  return (
    <>

    </>
  );
};

export default withLayout(Home);


export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const firstCategory = 0;
  const {data: menu} = await axios.post<MenuItem[]>(API.topPage.find, {
    firstCategory
  });

  return {
    props: {
      menu,
      firstCategory,
    }
  };
};

