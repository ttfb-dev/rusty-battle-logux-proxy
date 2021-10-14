import api from '../libs/api';
import { getRandomName } from '../libs/name_generator';

const general = (server) => {
  server.type('general/get_random_name', {
    async access(ctx, action, meta) {
      return true;
    },
    async process(ctx, action, meta) {
      
      const name = getRandomName();

      ctx.sendBack({
        type: 'general/get_random_name_success',
        name,
      });
    },
  });

  server.type('general/get_leader_board', {
    async access(ctx, action, meta) {
      return true;
    },
    async process(ctx, action, meta) {

      const { top } = await api.getTopList();

      ctx.sendBack({
        type: 'general/get_leader_board_success',
        top
      });
    },
  });
};

export default general;
