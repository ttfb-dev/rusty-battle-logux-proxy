const profile = (server) => {
  server.type('profile/get', {
    async access(ctx, action, meta) {
      return true;
    },
    async process(ctx, action, meta) {
      const userId = parseInt(ctx.userId, 10);

      const score = 100;

      ctx.sendBack({
        type: 'profile/get_success',
        score,
      });
    },
  });
};

export default profile;
