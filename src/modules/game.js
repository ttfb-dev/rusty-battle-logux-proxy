// import api from '../libs/api'
import api from '../libs/apiv2'

const profile = (server) => {
  server.type('game/start', {
    async access(ctx, action, meta) {
      return true;
    },
    async process(ctx, action, meta) {
      const userId = parseInt(ctx.userId, 10);

      const { battle_id, status } = await api.startBattle(userId);

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
      const {module, slot, current_round_number} = action;

      await api.setModule(battle_id, userId, module, slot);

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
      
      const { status } = await api.startFight(battle_id, userId);

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
      const { modules_ids } = action;

      const { status, log, winner } = await api.stepFight(battle_id, userId, modules_ids);

      const boss = await api.getBossRobot(battle_id, userId);
      const robot = await api.getUserRobot(battle_id, userId);

      ctx.sendBack({
        type: 'game/fight_step_success',
        status,
        log,
        robot,
        boss,
        winner,
      });
    }
  })
};

export default profile;
