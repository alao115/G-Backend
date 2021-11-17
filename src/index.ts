import 'reflect-metadata';
import express from 'express';
import { Server } from 'http';

import httpServer from './server';
import bootstrap from './loaders';
import config from './config';
import { onListening, onError } from './helpers/appsupport';

function startApp() {
  const app = express();

  /* Set environment */
  app.set('env', config.environment);
  /* Set environment */

  bootstrap({ app });

  httpServer({ app })
    .then((server) => onListening({ server } as { server: Server}))
    .catch(({ error, port }) => onError({ error, port }));
}

startApp();

