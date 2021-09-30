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

  async getRandomModules(battleId, userId) {
    return await this.get({
      path: `/api/modules/select?user_id=${userId}&battle_id=${battleId}`
    })
  }

  async setModule(battleId, userId, module_id, slot) {
    return await this.post({
      path: `/api/modules/set?user_id=${userId}&battle_id=${battleId}`,
      data: {
        module_id,
        slot
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
      });

      return false;
    }
  }
}

export default new Api();
