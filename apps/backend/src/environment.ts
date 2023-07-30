import { cleanEnv, str, bool, num } from 'envalid'

export const environment = cleanEnv(process.env, {
  NODE_ENV: str(),
  APP_ENV: str({ choices: ['local', 'dev', 'stg', 'qa', 'prod'] }),
  DB_HOST: str(),
  DB_PORT: num(),
  DB_USER: str(),
  DB_PASSWORD: str(),
  DB_DEBUG_LOG: bool({ default: true }),
  DB_CONNECTION_POOL_SIZE: num({ default: 200 }),
  PORT: num({ default: 8080 }),
  WALLET_PRIVATE_KEY: str(),
  INFURA_API_KEY: str(),
  OPERATOR_ADDRESS: str(),
  GREETER_CONTRACT_ADDRESS: str(),
  FACTORY_CONTRACT_ADDRESS: str(),
  NODE_URL: str(),
  ROLE_MANAGER_STORE_CONTRACT_ADDRESS: str(),
  ERC721_MADEBY_FACTORY_CONTRACT_ADDRESS: str(),
  MARKET_FOR_CREDIT_CARD_CONTRACT_ADDRESS: str(),
  ETHERSCAN_API_KEY: str()
})

export const appEnv = {
  isLocal: environment.APP_ENV === 'local',
  isDevelopment: environment.APP_ENV === 'dev',
  isStaging: environment.APP_ENV === 'stg',
  isQa: environment.APP_ENV === 'qa',
  isProduction: environment.APP_ENV === 'prod'
}
