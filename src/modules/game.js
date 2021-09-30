import api from '../libs/api'

const profile = (server) => {
  server.type('game/start', {
    async access(ctx, action, meta) {
      return true;
    },
    async process(ctx, action, meta) {
      const userId = parseInt(ctx.userId, 10);

      const { battle_id, state } = await api.startBattle(userId);

      ctx.sendBack({
        type: 'game/start_success',
        battle_id,
        state,
      });

      try {

        const { modules, round_number } = await api.getRandomModules(battle_id, userId);

        // const { robot } = await api.getUserRobot(battle_id, userId);

        ctx.sendBack({
          type: 'game/shuffle_set',
          modules,
          round: round_number,
          // robot,
        });
      } catch ({message}) {
        console.error(message)
      }
    },
  });

  server.type('game/module_set', {
    async access(ctx, action, meta) {
      return true;
    },
    async process(ctx, action, meta) {
      const userId = parseInt(ctx.userId, 10);
      const battle_id = parseInt(action.battle_id, 10);
      const {module_id, slot} = action;

      await api.setModule(battle_id, userId, module_id, slot);

      const { modules, round_number } = await api.getRandomModules(battle_id, userId);

      const { robot } = await api.getUserRobot(battle_id, userId);

      ctx.sendBack({
        type: 'game/shuffle_set',
        modules,
        round: round_number,
        robot,
      });
    }
  })
};

export default profile;
