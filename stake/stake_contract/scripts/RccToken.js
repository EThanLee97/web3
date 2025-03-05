const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying RccToken with account:", deployer.address);

  const RccToken = await ethers.getContractFactory("RccToken");

  console.log("Deploying RccToken...");

  // 设置固定 Gas 限制
  const token = await RccToken.deploy({ gasLimit: 5000000 });

  console.log("Transaction hash:", token.deploymentTransaction().hash);

  // 等待交易确认
  await token.deploymentTransaction().wait();

  console.log("RccToken deployed to:", await token.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Deployment failed:", error);
    process.exit(1);
  });
