const ethers = require('ethers');
const dotenv = require('dotenv');

dotenv.config();

async function main(){
    const privateKey = process.env.CHILD_KEY;
    const providerURL = process.env.CHILD_RPC;
    const rootUser = process.env.ROOT_USER;
    const childToken = process.env.CHILD_ERC20;
    const childBridge = process.env.CHILD_BRIDGE

    const provider = new ethers.JsonRpcProvider(providerURL);
    const wallet = new ethers.Wallet(privateKey, provider);
    const signer = wallet.connect(provider);

    const amountValue = ethers.parseUnits("5", 18);  // Replace "1.0" with the actual amount. Assumes token has 18 decimals.

    // Calling approve on Token

    const token_abi = require("../contracts/MyToken.json").abi
    const tokenContract = new ethers.Contract(childToken, token_abi, signer)

    // Calling bridgeAsset on Bridge Contract

    const destinationNetworkValue = 0;  // Replace with actual value
    const forceUpdateGlobalExitRootValue = false;  // or false, depending on your need
    const permitDataValue = "0x";  // example byte values

    const bridge_abi = require("../contracts/Bridge.json").abi
    const bridgeContract = new ethers.Contract(childBridge, bridge_abi, signer)
   
    const tx = await bridgeContract.bridgeAsset(
        destinationNetworkValue,
        rootUser,
        amountValue,
        childToken,
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