const ethers = require('ethers');
const dotenv = require('dotenv');

dotenv.config();

async function main(){
    const privateKey = process.env.ROOT_KEY;
    const providerURL = process.env.ROOT_RPC;
    const childUser = process.env.CHILD_USER;
    const rootToken = process.env.ROOT_ERC20;
    const rootBridge = process.env.ROOT_BRIDGE

    const provider = new ethers.JsonRpcProvider(providerURL);
    const wallet = new ethers.Wallet(privateKey, provider);
    const signer = wallet.connect(provider);

    const destinationNetworkValue = 1;  // Replace with actual value
    const amountValue = ethers.parseUnits("1.0", 18);  // Replace "1.0" with the actual amount. Assumes token has 18 decimals.
    const forceUpdateGlobalExitRootValue = false;  // or false, depending on your need
    const permitDataValue = "0x0123";  // example byte values


    const {abi} = require("../contracts/Bridge.json")
    const bridgeContract = new ethers.Contract(rootBridge, abi, signer)
   
    const tx = await bridgeContract.bridgeAsset(
        destinationNetworkValue,
        childUser,
        amountValue,
        rootToken,
        forceUpdateGlobalExitRootValue,
        permitDataValue
    );

    console.log("Transaction hash:", tx.hash);

    // Wait for the transaction to be mined
    const receipt = await tx.wait();
    console.log("Transaction was mined in block:", receipt.blockNumber);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });