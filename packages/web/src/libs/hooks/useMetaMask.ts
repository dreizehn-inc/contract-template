import { useEffect, useState } from "react";
import ethers from "ethers"

export const useMetaMask = (
) => {
  //メタマスクの接続の設定
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [accounts, setAccounts] = useState<string[]>();
  const [account, setAccount] = useState<string>();

  //メタマスクの接続
  const connectWalletHandler = () => {
    if ((window as any).ethereum && (window as any).ethereum.isMetaMask) {
      (window as any).ethereum
            .request({ method: "eth_requestAccounts" })
            .then((result: string[]) => {
                accountChangedHandler(result);
            })
            .catch((error: { message: any; }) => {
                console.log(error.message);
            });
    } else {
        console.log("Need to install MetaMask");
    }
  };
  //メタマスクのウォレットアドレスが変わった時に実行する関数
  const accountChangedHandler = (accounts: string[]) => {
    setAccounts(accounts);
    setAccount(accounts?.[0]);
  };

  //接続されているチェーンが切り替わった時に実行する関数
  const chainChangedHandler = () => {
    window.location.reload();
  };

  //provider,signer,contractの設定
  const updateEthers = () => {
    setProvider(provider);
    setSigner(signer);

    //アカウントが切り替わった時のイベントを拾う
    (window as any).ethereum.on("accountsChanged", accountChangedHandler);
    //接続されているチェーンが切り替わった時のイベントを拾う
    (window as any).ethereum.on("chainChanged", chainChangedHandler);
  };

  useEffect(() => {
    updateEthers()
  }, [])

  return {
    provider,
    signer,
    accounts,
    account,
    connectWalletHandler,
  }
}