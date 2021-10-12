import { Server } from '@logux/server';

import { isVkAuthorized } from './midlewares';

const isProd = process.env.NODE_ENV === 'production';

console.log(process);

const server = new Server(
  Server.loadOptions(process, {
    host: isProd ? '0.0.0.0' : '127.0.0.1',
    port: 31337,
    subprotocol: '1.0.0',
    supports: '1.0.0',
    root: './src',
  }),
);

server.auth(async ({ client, userId, token }) => {
  const isAuthorized = isVkAuthorized(userId, token);
  return isAuthorized;
});

server.on('disconnected', async (client) => {});

export { server };
