import fetch from 'node-fetch';

class Api {

  constructor () {
    this.host = 'http://rusty-api-nginx';
  }

  async startBattle(userId) {
    return await this.post({
      path: '/v1/battle?source=vk',
      data: {
        user_ids: [userId]
      },
      method: 'startBattle',
    })
  }

  async getUserRobot(battleId, userId) {
    return await this.get({
      path: `/v1/battle/${battleId}/robot?source=vk&user_id=${userId}`
    })
  }

  async getBossRobot(battleId, userId) {
    return await this.get({
      path: `/v1/battle/${battleId}/core-robot?source=vk&user_id=${userId}`
    })
  }

  async getRandomModules(battleId, userId) {
    return await this.get({
      path: `/v1/battle/${battleId}/arming-round?source=vk&user_id=${userId}`
    })
  }

  async setModule(battleId, userId, module, slot) {
    return await this.post({
      path: `/v1/battle/${battleId}/arming-round?source=vk&user_id=${userId}`,
      data: {
        module,
        slot
      }
    })
  }

  async startFight(battleId, userId) {
    return await this.post({
      path: `/v1/battle/${battleId}/finish-arming?source=vk&user_id=${userId}`
    })
  }

  async stepFight(battleId, userId, moduleIds) {
    return await this.post({
      path: `/v1/battle/${battleId}/fight-round?source=vk&user_id=${userId}`,
      data: {
        module_ids: moduleIds
      }
    })
  }

  async get({ path, method = null }) {
    try {
      const response = await fetch(this.host + path);
      if (!response.ok) {
        console.log((await response.json()));
        throw new Error(`Response status is not OK: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(error.message, {
        method,
        path
      });
      return;
    }
  }

  async post({ path, data, method = null }) {
    try {
      const response = await fetch(this.host + path, {
        method: "post",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        console.log((await response.json()));
        throw new Error(`Response status is not OK: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(error.message, {
        method,
        path,
        data
      });

      return false;
    }
  }
}

export default new Api();
