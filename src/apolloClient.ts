import { ApolloClient, InMemoryCache, createHttpLink, from, ApolloLink } from '@apollo/client';
import { setContext } from "@apollo/client/link/context";
import { onError } from '@apollo/client/link/error';
import * as https from "https";

const getHttpLink = (appUri?: string) => {

  const graphQlUri = `${appUri || process.env.APP_URL}/v2/graphql`;
  console.log('GraphQL @ ' + graphQlUri);

  const httpLink = createHttpLink({
    uri: graphQlUri,
    fetchOptions: {
      agent: new https.Agent({ rejectUnauthorized: false }),
    },
  });

  return httpLink;

};

const getServerHttpLink = () => {

  const graphQlUri = `${process.env.APP_URL}/v2/graphql`;
  console.log('GraphQL @ ' + graphQlUri);

  const httpLink = createHttpLink({
    uri: graphQlUri,
    fetchOptions: {
      agent: new https.Agent({ rejectUnauthorized: false }),
    },
  });

  return httpLink;

};

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: '',
    }
  }
});


const errorLink = onError(({ graphQLErrors, networkError }) => {

  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );
  }

  if (networkError) console.log(`[Network error]: ${networkError}`);

});

let cache = new InMemoryCache();

export const getClient = (appUri?: string) => {
  const client = new ApolloClient({
    link: from([
      errorLink,
      authLink,
      getHttpLink(appUri)
    ]),
    cache
  });
  return client;
};


export default getClient();
