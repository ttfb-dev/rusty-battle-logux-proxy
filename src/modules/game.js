import api from '../libs/api'

const profile = (server) => {
  server.type('game/start', {
    async access(ctx, action, meta) {
      return true;
    },
    async process(ctx, action, meta) {
      const userId = parseInt(ctx.userId, 10);

      const { battle_id, state: status } = await api.startBattle(userId);

      ctx.sendBack({
        type: 'game/start_success',
        battle_id,
        status,
      });

      const { modules, round_number } = await api.getRandomModules(battle_id, userId);

      const robot = await api.getUserRobot(battle_id, userId);

      ctx.sendBack({
        type: 'game/shuffle_set',
        modules,
        round: round_number,
        robot,
      });
    },
  });

  server.type('game/module_set', {
    async access(ctx, action, meta) {
      return true;
    },
    async process(ctx, action, meta) {
      const userId = parseInt(ctx.userId, 10);
      const battle_id = parseInt(action.battle_id, 10);
      const {module_id, slot, current_round_number} = action;

      await api.setModule(battle_id, userId, module_id, slot);

      if (current_round_number < 10) {
        const { modules, round_number } = await api.getRandomModules(battle_id, userId);

        const robot = await api.getUserRobot(battle_id, userId);

        ctx.sendBack({
          type: 'game/shuffle_set',
          modules,
          round: round_number,
          robot,
        });
      }
    }
  })

  server.type('game/start_fight', {
    async access(ctx, action, meta) {
      return true;
    },
    async process(ctx, action, meta) {
      const userId = parseInt(ctx.userId, 10);
      const battle_id = parseInt(action.battle_id, 10);
      
      const { state: status } = await api.startFight(battle_id, userId);

      const boss = await api.getBossRobot(battle_id, userId);

      ctx.sendBack({
        type: 'game/start_fight_success',
        status,
        boss,
      });
    }
  })

  server.type('game/fight_step', {
    async access(ctx, action, meta) {
      return true;
    },
    async process(ctx, action, meta) {
      const userId = parseInt(ctx.userId, 10);
      const battle_id = parseInt(action.battle_id, 10);
      const { module_ids } = action;

      const { state: status } = await api.stepFight(battle_id, userId, module_ids);

      const boss = await api.getBossRobot(battle_id, userId);
      const robot = await api.getUserRobot(battle_id, userId);

      ctx.sendBack({
        type: 'game/start_fight_success',
        status,
        robot,
        boss,
      });
    }
  })
};

export default profile;
