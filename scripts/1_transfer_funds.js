const ethers = require('ethers');
const dotenv = require('dotenv');

dotenv.config();

async function main() {
    const rootRpc = process.env.ROOT_RPC;
    const recipientAddress = process.env.ROOT_USER;
    const preFundedPrivateKey = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";

    if (!rootRpc ||  !recipientAddress || !preFundedPrivateKey) {
        console.error("Please ensure your .env file has ROOT_RPC, ROOT_USER, and ROOT_KEY defined.");
        return;
    }

    const provider = new ethers.JsonRpcProvider(rootRpc);
    const wallet = new ethers.Wallet(preFundedPrivateKey, provider);

    console.log("Sending funds:");
    console.log("Sender (Pre-funded):", wallet.address);
    console.log("Recipient:", recipientAddress);

    // Assuming sending 1 ETH for demonstration. Adjust the value as needed.
    const tx = await wallet.sendTransaction({
        to: recipientAddress,
        value: ethers.parseEther("10")
    });

    console.log("Transaction Hash:", tx.hash);

    await tx.wait();

    console.log(`Funds successfully sent to ${recipientAddress}`);
}

main()
    .catch(error => {
        console.error(error);
    });
