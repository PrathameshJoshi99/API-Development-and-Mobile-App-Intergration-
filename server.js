// File: server.js

const { ApolloServer, gql } = require('apollo-server');
const { Pool } = require('pg');

// Create a PostgreSQL connection pool
const pool = new Pool({
  user: 'your_db_user',
  host: 'your_db_host',
  database: 'your_db_name',
  password: 'your_db_password',
  port: 5432,
});

// GraphQL schema
const typeDefs = gql`
  type Query {
    hello: String
  }
`;

// GraphQL resolvers
const resolvers = {
  Query: {
    hello: () => 'Hello, World!',
  },
};

// Create an Apollo Server instance
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req, pool }),
});

// Start the server
server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
