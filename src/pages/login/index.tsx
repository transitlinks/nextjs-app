import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Router from 'next/router';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import Button from '@material-ui/core/Button';
import { useUser } from '../../hooks';
import Layout from '../../components/Layout';
import ValidatedInput, { InputState } from '../../components/ValidatedInput/ValidatedInput';
import { isValidEmail, isValidPassword } from '../../components/ValidatedInput/validators';
import { setAuth } from '../../state/actions/auth';
import styles from './login.module.css';

interface LoginProps {
  env: { [key: string]: string }
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { MEDIA_URL } = process.env;
  return {
    props: {
      env: { MEDIA_URL }
    }
  };
};

const Login = ({ env }: LoginProps) => {

  useUser({ redirectTo: '/' });

  const [errorMsg, setErrorMsg] = useState('');
  const [email, setEmail] = useState<InputState>({ value: '', pass: false });
  const [password, setPassword] = useState<InputState>({ value: '', pass: false });

  const dispatch = useDispatch();

  const logIn = async () => {

    const body = {
      email: email.value,
      password: password.value
    };

    try {

      const res = await fetch('/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const text = await res.text();
      if (res.status === 200 || res.status === 302) {
        const data = JSON.parse(text);
        dispatch(setAuth({ user: data.user, loggedIn: true }));
        Router.push('/');
      } else {
        let message = `Login Error (${res.status})`;
        try {
          message = (JSON.parse(text)).message;
        } catch (error) {
          console.error('Could not parse error response. Response body:', text);
        }
        throw new Error(message);
      }

    } catch (error) {
      console.error('Error in login', error);
      setErrorMsg(error.message);
    }

  };

  return (
    <Layout>
      <Head>
        <title>Transitlinks - Login</title>
      </Head>
      <main className={styles.root}>
        <div>
          <div className={styles.description}>
            Sign in using any of the methods below. In case you haven't signed in before, your account will be created at your first login.
            <br/><br/>
            By signing you are accepting our&nbsp;
            <a href="/about">
              service agreement
            </a>.
          </div>
          <div className={styles.extLogin}>
            <div className={styles.fbLogin}>
              <a href="/auth/facebook">
                <div className={styles.fbButton}>
                  <img src="/images/FB-f-Logo__blue_50.png" />
                </div>
                <div className={styles.fbText}>
                  Sign in with Facebook
                </div>
              </a>
            </div>
            <div className={styles.gLogin}>
              <a href="/auth/google">
                <div className={styles.gButton}>
                  <img src="/images/btn_google.png" />
                </div>
                <div className={styles.gText}>
                  Sign in with Google
                </div>
              </a>
            </div>
          </div>
          {
            errorMsg &&
            <div className={styles.error}>
              {errorMsg}
            </div>
          }
          <form action="/auth/login" method="post" className={styles.pwdLogin}>
            <div className={styles.formTitle}>
              Sign in with e-mail and password
            </div>
            <div className={styles.formItem}>
              <div className={styles.formInput}>
                <ValidatedInput id="email-input"
                                name="email"
                                value={email.value}
                                validate={isValidEmail}
                                onChange={(email: InputState) => setEmail(email)} />
              </div>
            </div>
            <div className={styles.formItem}>
              <div className={styles.formInput}>
                <ValidatedInput id="password-input"
                                name="password"
                                value={password.value}
                                validate={isValidPassword}
                                masked={true}
                                onChange={(password: InputState) => setPassword(password)} />
              </div>
            </div>
            <div className={styles.formSubmit}>
              <div className={styles.recoveryLink}>
                <a href="/reset-password">
                  Reset password
                </a>
              </div>
              <div className={styles.submitButton}>
                <Button color="secondary" variant="contained" disabled={!email.pass || !password.pass} onClick={logIn}>
                  Sign in
                </Button>
              </div>
            </div>
            <div>
            </div>
          </form>
        </div>
      </main>
    </Layout>
  );

};

export default Login;
