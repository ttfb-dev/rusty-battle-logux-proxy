import api from '../libs/api'

const profile = (server) => {
  server.type('game/start', {
    async access(ctx, action, meta) {
      return true;
    },
    async process(ctx, action, meta) {
      const userId = parseInt(ctx.userId, 10);

      const { battle_id, state } = await api.startBattle(userId);

      console.log('got from api');
      console.log({battle_id, state});

      ctx.sendBack({
        type: 'game/start_success',
        battle_id,
      });
    },
  });
};

export default profile;
