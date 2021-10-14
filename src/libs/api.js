import fetch from 'node-fetch';

class Api {

  constructor () {
    this.host = process.env.RUSTY_API_HOST;
    this.source = 'vk'
  }

  async startBattle(userId) {
    return await this.post({
      path: `/v1/battle?source=${this.source}&user_id=${userId}`,
      method: 'startBattle',
    })
  }

  async getUserRobot(battleId, userId) {
    return await this.get({
      path: `/v1/battle/${battleId}/robot?source=${this.source}&user_id=${userId}`
    })
  }

  async getBossRobot(battleId, userId) {
    return await this.get({
      path: `/v1/battle/${battleId}/core-robot?source=${this.source}&user_id=${userId}`
    })
  }

  async getRandomModules(battleId, userId) {
    return await this.get({
      path: `/v1/battle/${battleId}/arming-round?source=${this.source}&user_id=${userId}`
    })
  }

  async setModule(battleId, userId, module, slot) {
    return await this.post({
      path: `/v1/battle/${battleId}/arming-round?source=${this.source}&user_id=${userId}`,
      data: {
        module,
        slot
      }
    })
  }

  async startFight(battleId, userId) {
    return await this.post({
      path: `/v1/battle/${battleId}/finish-arming?source=${this.source}&user_id=${userId}`
    })
  }

  async stepFight(battleId, userId, modules_ids) {
    return await this.post({
      path: `/v1/battle/${battleId}/fight-round?source=${this.source}&user_id=${userId}`,
      data: {
        modules_ids: modules_ids
      }
    })
  }

  async whereIAm(userId) {
    return await this.get({
      path: `/v1/battle/where-i-am?source=${this.source}&user_id=${userId}`,
    })
  }

  async forceFinish(battleId, userId) {
    return await this.post({
      path: `/v1/battle/${battleId}/force-finish?source=${this.source}&user_id=${userId}`,
    })
  }

  async getTopList() {
    return await this.get({
      path: `/v1/top-list?source=${this.source}`,
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
