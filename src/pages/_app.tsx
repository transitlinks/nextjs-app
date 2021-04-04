import { useEffect } from 'react';
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { ApolloProvider } from '@apollo/client';
import { useStore } from '../state/store';
import { getClient } from '../apolloClient';
import '../styles/global.css';


const App = ({ Component, pageProps }: AppProps) => {

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  const store = useStore({
    ...pageProps.initialReduxState,
    env: pageProps.env
  });

  return (
    <ApolloProvider client={getClient(pageProps?.env?.APP_URL)}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </ApolloProvider>
  )

};

export default App;
