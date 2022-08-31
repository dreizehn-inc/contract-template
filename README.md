# Web3 Boiler

## Decentralized NFT Trading Application

本レポジトリは yarn の workspace 機能を用いた monorepo 構成になっています。

| Package                                       | Localhost             | Prodction |
| :-------------------------------------------- | :-------------------- | :-------- |
| **[[NEXT.JS] web](./packages/web)**           | http://localhost:3000 | TBD       |
| **[[Hardhat] contract](./packages/contract)** | ローカルネットワーク  | TBD       |

## 環境構築

### required

- node.js のランタイム
- direnv

### 構築手順

```
# install
$ yarn

# build
$ yarn build

# ローカルネットの起動
$ yarn workspace @web3-boiler/contract start:node

# frontendの起動
$ yarn workspace @web3-boiler/web start:node
```
