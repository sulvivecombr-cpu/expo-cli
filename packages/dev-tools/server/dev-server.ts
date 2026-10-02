import { graphiqlExpress } from 'apollo-server-express';
import openBrowserAsync from 'better-opn';
import express from 'express';
import http from 'http';
import next from 'next';

import { createAuthenticationContextAsync, startGraphQLServer } from './DevToolsServer';

const PORT = Number(process.env.PORT) || 3000;

async function run(): Promise<void> {
  try {
    const projectRoot = process.argv[2];
    if (!projectRoot) {
      throw new Error('No project dir specified.\nUsage: yarn dev [path]');
    }

    const app: any = next({ dev: true });
    await app.prepare();

    const server = express();
    const authenticationContext = await createAuthenticationContextAsync({ port: PORT });
    server.get('/dev-tools-info', authenticationContext.requestHandler);
    server.get(
      '/graphiql',
      graphiqlExpress({
        endpointURL: authenticationContext.webSocketGraphQLUrl,
        websocketConnectionParams: {
          clientAuthenticationToken: authenticationContext.clientAuthenticationToken,
        },
      })
    );
    server.get('*', app.getRequestHandler());

    const httpServer = http.createServer(server);
    await new Promise((resolve, reject) => {
      httpServer.once('error', reject);
      httpServer.once('listening', resolve);
      httpServer.listen(PORT, '0.0.0.0');
    });
    startGraphQLServer(projectRoot, httpServer, authenticationContext);
    console.log('Starting project...');
    try {
      const { Project } = await import('xdl');
      await Project.startAsync(projectRoot);
    } catch (error) {
      console.warn('Could not start project bundler:', error?.message || error);
    }
    const url = `http://0.0.0.0:${PORT}`;
    console.log(`Development server running at ${url}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

run();
