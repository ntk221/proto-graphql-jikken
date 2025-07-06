import { createYoga } from 'graphql-yoga';
import express from 'express';
import http from 'http';

import { schema } from './schema.js';
import { MyContext } from './context.js';

const app = express();

const yoga = createYoga<{}, MyContext>({
  schema,
  context: () => ({}),
  graphiql: {
    endpoint: '/graphql',
  },
});

app.use('/graphql', yoga);

const httpServer = http.createServer(app);

await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve));
console.log(`🚀 Server ready at http://localhost:4000/graphql`);
