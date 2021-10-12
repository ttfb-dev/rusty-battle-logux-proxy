import { Server } from '@logux/server';

import { isVkAuthorized } from './midlewares';

const isProd = process.env.NODE_ENV === 'production';

delete process.env['LOGUX_PROXY_NODEJS_SERVICE_HOST'];
console.log(process.env);

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
