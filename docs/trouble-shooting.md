# トラブルシューティング

## Node 関連

### 1. local で開発用の node を立てる場合は毎回デプロイする必要がある

以下のエラーが出た場合は、コントラクトがデプロイされていない状態で chain から情報を取得しようとした場合に発生する。

```sh
Error: call revert exception [ See: https://links.ethers.org/v5-errors-CALL_EXCEPTION ] (method="greet()", errorArgs=null, errorName=null, errorSignature=null, reason=null, code=CALL_EXCEPTION, version=abi/5.6.0)
```

以下の手順で必ずデプロイし直すこと。この場合、コントラクトアドレスは変わらないので環境変数に設定しているアドレスはそのままでよい。

```sh

$ yarn workspace @web3-boiler/contract start:node

$ yarn workspace @web3-boiler/contract deploy

```
