# Polygon CDK Setup and Demo

This repo contains all the necessary steps to:
1. Transfer Funds from PreFunded Key on L1 to your wallet.
2. Deploy Contracts on L1.
3. Deposit Assets to L2.
4. Withdraw Assets from L2.

First follow the instructions [here](https://github.com/0xPolygon/cdk-validium-node#readme) to setup a local CDK node. It will setup a local L1 (geth) and a local L2 (CDK Validium Node).

Once you ensure that the local L1 and L2 are running, you can run the following commands to ping the local L1 and L2.

## Setup
```
git clone https://github.com/integrations-Polygon/cdk-demo.git
cd cdk-demo
```

Create a .env file with these values:
```
ROOT_USER=<your_wallet_address>
CHILD_USER=<your_wallet_address>
ROOT_KEY=<your_wallets_key>
CHILD_KEY=<your_wallets_key>
ROOT_RPC=http://localhost:8545
CHILD_RPC=http://localhost:8123
```

## 0. Check L1 and L2 Network info
```
node scripts/0_check_network.js
```
## 1. Transfer Funds from PreFunded Account
```
node scripts/1_transfer_funds.js
```

## 2. Deploy ERC20 to Rootchain
```
node scripts/2_deploy_erc20.js 
```

Update the .env file with the ROOT_BRIDGE address
```
ROOT_ERC20=<process_here>
```

## 3. Deposit to Bridge Asset
```
node scripts/3_deposit_bridge.js
```