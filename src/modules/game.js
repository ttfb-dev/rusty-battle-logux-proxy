const profile = (server) => {
  server.type('game/start', {
    async access(ctx, action, meta) {
      return true;
    },
    async process(ctx, action, meta) {
      const userId = parseInt(ctx.userId, 10);

      const battle_id = 1;

      ctx.sendBack({
        type: 'game/start_success',
        battle_id,
      });
    },
  });
};

export default profile;
