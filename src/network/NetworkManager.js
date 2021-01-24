import { networkProviderInstance } from './NetworkProvider';

export class NetworkManager {
  static instance;
  constructor() {
    this.networkProviderInstance = networkProviderInstance;
  }

  static getInstance() {
    if (!NetworkManager.instance)
      NetworkManager.instance = new NetworkManager();
    return NetworkManager.instance;
  }

  get(path, config) {
    return this.networkProviderInstance.get(path, config);
  }
}
