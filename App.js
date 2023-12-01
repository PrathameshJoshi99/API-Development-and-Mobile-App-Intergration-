// File: App.js (React Native App)

import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';

const httpLink = createHttpLink({
  uri: 'http://your-apollo-server-url', // replace with your actual Apollo Server URL
});

const authLink = setContext((_, { headers }) => {
  // You might implement authentication logic here if needed
  // For simplicity, leaving it empty for now
  return {
    headers: {
      ...headers,
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      {/* Your React Native App components go here */}
    </ApolloProvider>
  );
};

export default App;
