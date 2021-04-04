import { ApolloClient, InMemoryCache, createHttpLink, from, ApolloLink } from '@apollo/client';
import { setContext } from "@apollo/client/link/context";
import { onError } from '@apollo/client/link/error';
import * as https from "https";

const httpLink = createHttpLink({
  uri: 'https://local.transitlinks.net/v2/graphql',
  fetchOptions: {
    agent: new https.Agent({ rejectUnauthorized: false }),
  },
});

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

const client = new ApolloClient({
  link: from([
    errorLink,
    authLink,
    httpLink
  ]),
  cache
});

export default client;
