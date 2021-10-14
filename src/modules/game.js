import api from '../libs/api'

const profile = (server) => {

  server.type('game/load', {
    async access(ctx, action, meta) {
      return true;
    },
    async process(ctx, action, meta) {
      const userId = parseInt(ctx.userId, 10);
      const battle_id = parseInt(action.battle_id, 10);

      const { status } = await api.whereIAm(userId);

      let modules, arming_round_number;

      if (status === 'arming') {
        const shuffle = await api.getRandomModules(battle_id, userId);
        modules = shuffle.modules;
        arming_round_number = shuffle.round_number;
      }

      const boss = await api.getBossRobot(battle_id, userId);
      const robot = await api.getUserRobot(battle_id, userId);

      ctx.sendBack({
        type: 'game/load_success',
        battle_id,
        status,
        modules,
        arming_round_number,
        boss,
        robot,
      });
    },
  })

  server.type('game/where_i_am', {
    async access(ctx, action, meta) {
      return true;
    },
    async process(ctx, action, meta) {
      const userId = parseInt(ctx.userId, 10);

      const { battle_id, status } = await api.whereIAm(userId);

      ctx.sendBack({
        type: 'game/where_i_am_success',
        battle_id,
        status,
      });
    },
  })

  server.type('game/force_finish', {
    async access(ctx, action, meta) {
      return true;
    },
    async process(ctx, action, meta) {
      const userId = parseInt(ctx.userId, 10);
      const finishingBattleId = parseInt(action.battle_id, 10);

      await api.forceFinish(finishingBattleId, userId);

      const { battle_id, status } = await api.whereIAm(userId);

      ctx.sendBack({
        type: 'game/force_finish_success',
        battle_id,
        status,
      });
    },
  })

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

      const { status, log, winner, points } = await api.stepFight(battle_id, userId, modules_ids);

      const boss = await api.getBossRobot(battle_id, userId);
      const robot = await api.getUserRobot(battle_id, userId);

      ctx.sendBack({
        type: 'game/fight_step_success',
        status,
        log,
        robot,
        boss,
        winner,
        points,
      });
    }
  })
};

export default profile;
