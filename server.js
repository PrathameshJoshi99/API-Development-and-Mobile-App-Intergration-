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
// File: server.js (continued)

// Add mutation for generating a unique room ID
const typeDefs = gql`
  type Query {
    hello: String
  }

  type Mutation {
    generateRoomID: String
  }
`;

// Add resolver for the generateRoomID mutation
const resolvers = {
  Query: {
    hello: () => 'Hello, World!',
  },
  Mutation: {
    generateRoomID: async (_, __, { pool }) => {
      const client = await pool.connect();

      try {
        // Generate a unique room ID (for simplicity, using a timestamp)
        const roomID = `room_${Date.now()}`;
        return roomID;
      } finally {
        client.release();
      }
    },
  },
};


// Extend the GraphQL schema with CRUD operations for tournaments
const typeDefs = gql`
  type Query {
    hello: String
    getTournament(id: ID!): Tournament
  }

  type Mutation {
    generateRoomID: String
    createTournament(name: String!): Tournament
    updateTournament(id: ID!, name: String!): Tournament
    deleteTournament(id: ID!): Boolean
  }

  type Tournament {
    id: ID!
    name: String!
  }
`;

// Implement resolvers for CRUD operations
const resolvers = {
  Query: {
    hello: () => 'Hello, World!',
    getTournament: async (_, { id }, { pool }) => {
      const client = await pool.connect();

      try {
        const result = await client.query('SELECT * FROM tournaments WHERE id = $1', [id]);
        return result.rows[0];
      } finally {
        client.release();
      }
    },
  },
  Mutation: {
    generateRoomID: async (_, __, { pool }) => {
      // ... (same as previous code)
    },
    createTournament: async (_, { name }, { pool }) => {
      const client = await pool.connect();

      try {
        const result = await client.query('INSERT INTO tournaments (name) VALUES ($1) RETURNING *', [name]);
        return result.rows[0];
      } finally {
        client.release();
      }
    },
    updateTournament: async (_, { id, name }, { pool }) => {
      const client = await pool.connect();

      try {
        const result = await client.query('UPDATE tournaments SET name = $1 WHERE id = $2 RETURNING *', [name, id]);
        return result.rows[0];
      } finally {
        client.release();
      }
    },
    deleteTournament: async (_, { id }, { pool }) => {
      const client = await pool.connect();

      try {
        await client.query('DELETE FROM tournaments WHERE id = $1', [id]);
        return true;
      } finally {
        client.release();
      }
    },
  },
};

// Extend the GraphQL schema with a type for the lobby
const typeDefs = gql`
  type Query {
    hello: String
    getTournament(id: ID!): Tournament
    getLobby: [Player]
  }

  type Player {
    id: ID!
    username: String!
  }

  type Mutation {
    generateRoomID: String
    createTournament(name: String!): Tournament
    updateTournament(id: ID!, name: String!): Tournament
    deleteTournament(id: ID!): Boolean
    joinLobby(username: String!): Player
  }
`;

// Implement resolvers for lobby-related operations
const resolvers = {
  Query: {
    hello: () => 'Hello, World!',
    getTournament: async (_, { id }, { pool }) => {
      // ... (same as previous code)
    },
    getLobby: async (_, __, { pool }) => {
      const client = await pool.connect();

      try {
        const result = await client.query('SELECT * FROM players');
        return result.rows;
      } finally {
        client.release();
      }
    },
  },
  Mutation: {
    generateRoomID: async (_, __, { pool }) => {
      // ... (same as previous code)
    },
    createTournament: async (_, { name }, { pool }) => {
      // ... (same as previous code)
    },
    updateTournament: async (_, { id, name }, { pool }) => {
      // ... (same as previous code)
    },
    deleteTournament: async (_, { id }, { pool }) => {
      // ... (same as previous code)
    },
    joinLobby: async (_, { username }, { pool }) => {
      const client = await pool.connect();

      try {
        const result = await client.query('INSERT INTO players (username) VALUES ($1) RETURNING *', [username]);
        return result.rows[0];
      } finally {
        client.release();
      }
    },
  },
};


const { PubSub } = require('apollo-server');

const pubsub = new PubSub();

// Extend the GraphQL schema with a subscription for tournament updates
const typeDefs = gql`
  type Query {
    hello: String
    getTournament(id: ID!): Tournament
    getLobby: [Player]
  }

  type Mutation {
    generateRoomID: String
    createTournament(name: String!): Tournament
    updateTournament(id: ID!, name: String!): Tournament
    deleteTournament(id: ID!): Boolean
    joinLobby(username: String!): Player
  }

  type Subscription {
    tournamentUpdated: Tournament
  }
`;

// Implement resolvers for subscriptions
const resolvers = {
  Query: {
    // ... (same as previous code)
  },
  Mutation: {
    // ... (same as previous code)
  },
  Subscription: {
    tournamentUpdated: {
      subscribe: () => pubsub.asyncIterator(['TOURNAMENT_UPDATED']),
    },
  },
};
