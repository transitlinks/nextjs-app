import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useUser } from '../../hooks';
import Layout from '../../components/Layout';

interface HomeProps {
  feed: [any];
  env: { [key: string]: string };
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { MEDIA_URL } = process.env;
  return {
    props: {
      feed: [],
      env: { MEDIA_URL }
    }
  };
};

const Home = ({ feed }: HomeProps) => {

  useUser();

  return (
    <Layout>
      <Head>
        <title>Transitlinks - Login</title>
      </Head>
      <main>
        <div>Feed item 1</div>
        <div>Feed item 2</div>
      </main>
    </Layout>
  )
};

export default Home;
