import type {AppProps} from 'next/app';
import Head from 'next/head';
import {Router} from 'next/router';
import React from 'react';
import '../styles/globals.css';
import ym from 'react-yandex-metrika';
import {YMInitializer} from 'react-yandex-metrika';

Router.events.on('routeChangeComplete', (url: string) => {
  if (typeof window !== 'undefined') {
    ym('hit', url);
  }
});

function MyApp({Component, pageProps, router}: AppProps) {

  return (
    <>
      <Head>
        <title>My-top - наш лучший ТОП</title>
        <link rel="preconnect" href="https://mc.yandex.ru" />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta property={'og:url'} content={process.env.NEXT_PUBLIC_DOMAIN + router.asPath}/>
        <meta property={'og:locale'} content={'ru-RU'}/>
      </Head>
      <YMInitializer
        accounts={[]}
        options={{
          webvisor: true,
          defer: true,
        }}
        version={'2'}
      />
      <Component {...pageProps} />
    </>
  )
    ;
}

export default MyApp;
