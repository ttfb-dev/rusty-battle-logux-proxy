import fetch from 'node-fetch';

class Api {

  constructor () {
    this.host = 'http://rb-api-nginx';
  }

  async startBattle(userId) {
    return await this.post({
      path: '/api/battle',
      data: {
        user_id: userId
      },
      method: 'startBattle',
    })
  }

  async getUserRobot(battleId, userId) {
    return await this.get({
      path: `/api/battle/robot?user_id=${userId}&battle_id=${battleId}`
    })
  }

  async getBossRobot(battleId, userId) {
    return await this.get({
      path: `/api/battle/robot-boss?user_id=${userId}&battle_id=${battleId}`
    })
  }

  async getRandomModules(battleId, userId) {
    return await this.get({
      path: `/api/modules?user_id=${userId}&battle_id=${battleId}`
    })
  }

  async setModule(battleId, userId, module, slot) {
    return await this.post({
      path: `/api/modules?user_id=${userId}&battle_id=${battleId}`,
      data: {
        module,
        slot
      }
    })
  }

  async startFight(battleId, userId) {
    return await this.post({
      path: `/api/battle/fight-start?user_id=${userId}&battle_id=${battleId}`
    })
  }

  async stepFight(battleId, userId, moduleIds) {
    return await this.post({
      path: `/api/battle/fight-step?user_id=${userId}&battle_id=${battleId}`,
      data: {
        modules: moduleIds
      }
    })
  }

  async get({ path, method = null }) {
    try {
      const response = await fetch(this.host + path);
      if (!response.ok) {
        throw new Error(`Response status is not OK: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(error.message, {
        method,
        path,
        message: await response.json(),
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
        throw new Error(`Response status is not OK: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(error.message, {
        method,
        path,
        data,
        message: await response.json(),
      });

      return false;
    }
  }
}

export default new Api();
