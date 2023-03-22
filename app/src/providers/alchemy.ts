import { Network, Alchemy, AlchemySettings } from "alchemy-sdk";

const settings: AlchemySettings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.MATIC_MUMBAI,
  maxRetries: 1,
};

export const alchemy = new Alchemy(settings);
export const alchemyProvider = await alchemy.config.getProvider();
