const hooks = (httpServer, server) => {
  httpServer.get(
    '/base-hook',
    async (request, response) => {
      response.send('OK');  
    },
  );
};

export default hooks;
