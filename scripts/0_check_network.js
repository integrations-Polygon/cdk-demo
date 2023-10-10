const ethers = require('ethers');
const dotenv = require('dotenv');

dotenv.config();

const getNetworkDetails = async (rpcUrl) => {
    const provider = new ethers.JsonRpcProvider(rpcUrl);
    const network = await provider.getNetwork();
    const blockNumber = await provider.getBlockNumber();

    return {
        name: network.name,
        chainId: network.chainId,
        blockHeight: blockNumber
    };
};

async function main() {
    const rootRpc = process.env.ROOT_RPC;
    const childRpc = process.env.CHILD_RPC;

    const rootNetworkDetails = await getNetworkDetails(rootRpc);
    const childNetworkDetails = await getNetworkDetails(childRpc);

    console.log("Rootchain Network Details:");
    console.log(`- RPC: ${rootRpc}`);
    console.log(`- Chain ID: ${rootNetworkDetails.chainId}`);
    console.log(`- Block Height: ${rootNetworkDetails.blockHeight}`);

    console.log("\nChildchain Network Details:");
    console.log(`- RPC: ${childRpc}`);
    console.log(`- Chain ID: ${childNetworkDetails.chainId}`);
    console.log(`- Block Height: ${childNetworkDetails.blockHeight}`);
}

main()
    .catch(error => {
        console.error(error);
    });
