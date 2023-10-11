const ethers = require('ethers');
const dotenv = require('dotenv');

dotenv.config();

async function main() {
    const privateKey = process.env.ROOT_KEY;
    const providerURL = process.env.ROOT_RPC;

    const provider = new ethers.JsonRpcProvider(providerURL);
    const wallet = new ethers.Wallet(privateKey, provider);
    const signer = wallet.connect(provider);

    const contractJSON = require('../contracts/MyToken.json');
    const abi = contractJSON.abi;
    const bytecode = contractJSON.bytecode;

    const factory = new ethers.ContractFactory(abi, bytecode, signer);
    
    const deployment = factory.deploy();
    const contract = await deployment;
    const contract_address = await contract.getAddress()
    console.log("Contract deployed at:", contract_address)
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });

