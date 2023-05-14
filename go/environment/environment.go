package environment

type Environment struct {
	ChainID                         int    `env:"CHAIN_ID,required"`
	InfuraAPIKey                    string `env:"INFURA_API_KEY,required"`
	WalletPrivateKey                string `env:"WALLET_PRIVATE_KEY,required"`
	FactoryContractAddress          string `env:"FACTORY_CONTRACT_ADDRESS,required"`
	RoleManagerStoreContractAddress string `env:"ROLE_MANAGER_STORE_CONTRACT_ADDRESS,required"`
}
