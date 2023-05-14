package main

import (
	"context"
	"crypto/ecdsa"
	"fmt"
	"log"
	"math/big"
	"math/rand"
	"time"

	"github.com/caarlos0/env/v6"
	factory_contract "github.com/dreizehn-inc/contract-template/go/contracts/factory"
	"github.com/dreizehn-inc/contract-template/go/environment"
	"github.com/ethereum/go-ethereum/accounts/abi/bind"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/crypto"
	"github.com/ethereum/go-ethereum/ethclient"
)

func main() {
	e := &environment.Environment{}
	if err := env.Parse(e); err != nil {
		panic(err)
	}
	cli, err := ethclient.Dial(fmt.Sprintf("https://polygon-mumbai.g.alchemy.com/v2/%s", e.InfuraAPIKey))
	if err != nil {
	}
	privateKey, err := crypto.HexToECDSA(e.WalletPrivateKey)
	if err != nil {
	}

	publicKey := privateKey.Public()
	publicKeyECDSA, ok := publicKey.(*ecdsa.PublicKey)
	if !ok {
		log.Fatal("error casting public key to ECDSA")
	}
	fromAddress := crypto.PubkeyToAddress(*publicKeyECDSA)
	nonce, err := cli.PendingNonceAt(context.Background(), fromAddress)
	if err != nil {
		log.Fatal(err)
	}
	gasPrice, err := cli.SuggestGasPrice(context.Background())
	if err != nil {
		log.Fatal(err)
	}
	auth, err := bind.NewKeyedTransactorWithChainID(privateKey, big.NewInt(int64(e.ChainID)))
	if err != nil {
		panic(err)
	}
	auth.Nonce = big.NewInt(int64(nonce))
	auth.Value = big.NewInt(0)     // in wei
	auth.GasLimit = uint64(300000) // in units
	auth.GasPrice = gasPrice

	factoryCli, err := factory_contract.NewFactory(common.HexToAddress(e.FactoryContractAddress), cli)
	if err != nil {
		panic(err)
	}

	res, err := factoryCli.Deploy(
		auth,
		"Dreizehn NFT (Example)",
		"DNFT",
		"https://dreizehn.io",
		".json",
		common.HexToAddress(e.RoleManagerStoreContractAddress),
		newSalt(),
	)
	if err != nil {
		panic(err)
	}

	fmt.Println("deploy success")
	fmt.Println(res.Hash().Hex())
}

func newSalt() [32]byte {
	seed := time.Now().UnixNano()
	r := rand.New(rand.NewSource(seed))
	b := make([]byte, 32)
	r.Read(b)
	var ret [32]byte
	copy(ret[:], b[0:32])
	return ret
}
