const hre = require("hardhat");

async function main() {
  // Get the contract factory
  const Tracking = await hre.ethers.getContractFactory("Tracking");
  console.log("Deploying contract...");

  // Deploy the contract
  const tracking = await Tracking.deploy();

  // Wait for the deployment transaction to be mined
  const deploymentReceipt = await tracking.waitForDeployment();

  // Log the deployed contract address
  console.log("Contract successfully deployed!");
  console.log(`Tracking deployed to: ${tracking.target}`);
}

main().catch((error) => {
  console.error("Error in deployment:", error);
  process.exitCode = 1;
});
