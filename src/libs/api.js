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

  async get({ path, method = null }) {
    try {
      const response = await fetch(path);
      if (!response.ok) {
        throw new Error(`Response status is not OK: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.critical(error.message, {
        method,
        path,
      });
      return;
    }
  }

  async post({ path, data, method = null }) {
    try {
      const response = await fetch(path, {
        method: "post",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Response status is not OK: ${response.status}`);
      }

      return true;
    } catch (error) {
      console.critical(error.message, {
        method,
        path,
        data,
      });

      return false;
    }
  }
}

export default new Api();
