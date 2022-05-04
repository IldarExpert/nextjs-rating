import React, {FunctionComponent, useEffect} from 'react';
import Up from '../components/up/up';
import {AppContextProvider, IAppContext} from '../context/app.context';
import Footer from './footer/footer';
import Header from './header/header';
import styles from './layout.module.css';
import {LayoutProps} from './layout.props';
import Sidebar from './sidebar/sidebar';

const Layout = ({children}: LayoutProps): JSX.Element => {
//   useEffect(() => {
//     setInterval(() =>  console.log(document.activeElement), 3000);
//     }
// );

  return (
    <div className={styles.wrapper}>
      <Header className={styles.header}/>
      <Sidebar className={styles.sidebar}/>
      <main className={styles.body}>
        {children}
      </main>
      <Footer className={styles.footer}/>
      <Up />
    </div>
  );
};

export const withLayout = <T extends Record<string, unknown> & IAppContext>(Component: FunctionComponent<T>) => {
  return function withLayoutComponent(props: T): JSX.Element {
    return (
      <AppContextProvider menu={props.menu} firstCategory={props.firstCategory}>
        <Layout>
          <Component {...props} />
        </Layout>
      </AppContextProvider>
    );
  };
};
