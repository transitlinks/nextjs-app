import Layout from '../components/Layout';
import { GetServerSideProps } from 'next';
import { useUser } from '../hooks';

interface HomeProps {
  feed: [any];
  env: any;
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      feed: [],
      env: { MEDIA_URL: process.env.MEDIA_URL }
    }
  };
};

const Home = ({ feed }: HomeProps) => {

  useUser({ redirectTo: '/' });

  return (
    <Layout>
      <div>Feed item 1</div>
      <div>Feed item 2</div>
    </Layout>
  )
};

export default Home;
