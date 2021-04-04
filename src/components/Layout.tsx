import Head from 'next/head';
import styles from './Layout.module.css';
import Header from './Header/Header';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children } : LayoutProps) => {

  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" type="image/ico" href="/images/favicon-16x16.ico" sizes="16x16" />
        <link rel="icon" type="image/ico" href="/images/favicon-32x32.ico" sizes="32x32" />
        <link rel="icon" type="image/ico" href="/images/favicon-96x96.ico" sizes="96x96" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
        <meta
          name="description"
          content="Transitlinks - Social World Map and transit resource"
        />
        <meta
            property="og:image"
            content="/images/logo-square.png"
        />
        <meta name="og:title" content="Transitlinks - Social World Map" />
      </Head>
      <Header />
      <main>
        {children}
      </main>
    </div>
  );

};

export default Layout;
