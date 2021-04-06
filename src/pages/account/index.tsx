import Head from 'next/head';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import Button from '@material-ui/core/Button';
import Layout from '../../components/Layout';
import styles from './account.module.css';
import Profile from "../../components/Account/Profile";
import { getClient } from "../../apolloClient";
import { GET_USER } from "../../queries/user";
import { getUser_getUser } from "../../generated/types/getUser";

export const getServerSideProps: GetServerSideProps = async ({ req }: GetServerSidePropsContext) => {

  const apolloClient = getClient(process.env.APP_URL);
  const { data } = await apolloClient.query({
    query: GET_USER,
    context: { headers: { cookie: req.headers.cookie } },
    fetchPolicy: 'no-cache'
  });

  const { MEDIA_URL, APP_URL } = process.env;

  return { props: { user: data.getUser, env: { MEDIA_URL, APP_URL } } };

};

interface AccountProps {
  user: getUser_getUser;
}

const Account = ({ user }: AccountProps) => {

  return (
    <Layout>
      <Head>
        <title>Transitlinks - Account</title>
      </Head>
      <main className={styles.root}>
        <div className={styles.container}>
          <div>
            <Profile user={user} />
          </div>
        </div>
      </main>
    </Layout>
  );

};

export default Account;
