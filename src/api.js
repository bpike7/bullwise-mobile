import axios from 'axios';
import Constants from "expo-constants";
import { API_URL, BULLWISE_WS_URL } from '@env';
const { manifest } = Constants;

if (!API_URL) throw Error('Environment variables not populating');

export default new class {
  constructor() {
    this._requestor = axios.create({
      baseURL: `http://${(typeof manifest.packagerOpts === `object`) && manifest.packagerOpts.dev
        ? manifest.debuggerHost.split(`:`).shift().concat(`:3001`)
        : API_URL}`
    });

    this._ws = new WebSocket(
      `ws://${(typeof manifest.packagerOpts === `object`) && manifest.packagerOpts.dev
        ? manifest.debuggerHost.split(`:`).shift().concat(`:6969`)
        : BULLWISE_WS_URL}`
    );
    this._ws.onopen = () => console.log('Connected to Bullwise server websocket!');
  }

  async getInitialData() {
    try {
      const { data } = await this._requestor.post('/get-initial-data')
      return data;
    } catch (err) {
      console.log(err);
    }
  }

  async getAllPositions() {
    try {
      const { data } = await this._requestor.post('/get-all-positions')
      return data;
    } catch (err) {
      console.log(err);
    }
  }

  async createOrder({ symbol, option_type, strike }) {
    try {
      const { data } = await this._requestor.post('/create-order', {
        symbol,
        option_type,
        strike
      });
      return data;
    } catch (err) {
      console.log(err);
    }
  }
}
