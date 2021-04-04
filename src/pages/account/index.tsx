import Head from 'next/head';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import Button from '@material-ui/core/Button';
import Layout from '../../components/Layout';
import styles from './account.module.css';
import Profile from "../../components/Account/Profile";
import apolloClient from "../../apolloClient";
import { GET_USER } from "../../queries/user";
import { UserInput } from "../../generated/types/globalTypes";

export const getServerSideProps: GetServerSideProps = async ({ req }: GetServerSidePropsContext) => {

  const { data } = await apolloClient.query({
    query: GET_USER,
    context: { headers: { cookie: req.headers.cookie } }
  });

  const { MEDIA_URL, APP_URL } = process.env;

  return { props: { user: data.getUser, env: { MEDIA_URL, APP_URL } } };

};

interface AccountProps {
  user: UserInput;
}

const Account = ({ user }: AccountProps) => {

  return (
    <Layout>
      <Head>
        <title>Transitlinks - Account</title>
      </Head>
      <main className={styles.root}>
        <div className={styles.container}>
          <div className={styles.logOut}>
            <Button color="primary" variant="contained" onClick={() => { location.href = "/auth/logout" }}>
              Sign out
            </Button>
          </div>
          <div>
            <Profile user={user} />
          </div>
        </div>
      </main>
    </Layout>
  );

};

export default Account;
