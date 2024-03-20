// /src/server.ts
import express from 'express';
import { connect } from './connect';

const app = express();
const port = process.env.PORT || 3000;

async function startServer() {
  await connect();
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

startServer();
