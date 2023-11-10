const ethers = require('ethers');
const dotenv = require('dotenv');
const bridgeABI = require('../contracts/Bridge.json').abi

dotenv.config();

async function callNetworkID(contract) {
    let networkID;
    try {
        networkID = await contract.networkID();
    } catch (error) {
        console.error('Error:', error);
    }
    return networkID;
}

const getNetworkDetails = async (rpcUrl, bridgeAddress) => {
    const provider = new ethers.JsonRpcProvider(rpcUrl);
    const network = await provider.getNetwork();
    const blockNumber = await provider.getBlockNumber();

    console.log({bridgeAddress})

    const contract = new ethers.Contract(bridgeAddress, bridgeABI, provider);
    const networkID = await callNetworkID(contract);

    return {
        name: network.name,
        chainId: network.chainId,
        blockHeight: blockNumber,
        bridgeAddress,
        networkID
    };
};

async function main() {
    const rootRpc = process.env.ROOT_RPC;
    const childRpc = process.env.CHILD_RPC;
    const rootBridge = process.env.ROOT_BRIDGE;
    const childBridge = process.env.CHILD_BRIDGE;

    const rootNetworkDetails = await getNetworkDetails(rootRpc, rootBridge);
    const childNetworkDetails = await getNetworkDetails(childRpc, childBridge);

    console.log("Rootchain Network Details:");
    console.log(`- RPC: ${rootRpc}`);
    console.log(`- Chain ID: ${rootNetworkDetails.chainId}`);
    console.log(`- Block Height: ${rootNetworkDetails.blockHeight}`);
    console.log(`- Bridge Address: ${rootNetworkDetails.bridgeAddress}`);
    console.log(`- Network ID: ${rootNetworkDetails.networkID}`);

    console.log("\nChildchain Network Details:");
    console.log(`- RPC: ${childRpc}`);
    console.log(`- Chain ID: ${childNetworkDetails.chainId}`);
    console.log(`- Block Height: ${childNetworkDetails.blockHeight}`);
    console.log(`- Bridge Address: ${childNetworkDetails.bridgeAddress}`);
    console.log(`- Network ID: ${childNetworkDetails.networkID}`);
}

main()
    .catch(error => {
        console.error(error);
    });
