const { ethers, upgrades } = require("hardhat");

async function main() {
  try {
    //  RCC Token 地址
    const RccToken = "0x4D20203ABe4a1F90739D73705E58795eC45aACd4";

    //  质押起始区块高度，可以去 Sepolia 上读取最新区块高度
    const startBlock = 22699088;

    //  质押结束区块高度（根据 12s/块 计算）
    const endBlock = 23345488;

    //  每个区块奖励的 RCC Token 数量
    const RccPerBlock = "20000000000000000";

    // 获取 RCCStake 合约工厂
    const Stake = await ethers.getContractFactory("RCCStake");

    console.log("Deploying RCCStake...");

    //  部署透明代理合约
    const stakeContract = await upgrades.deployProxy(
      Stake,
      [RccToken, startBlock, endBlock, RccPerBlock],
      { initializer: "initialize" }
    );

    // 等待部署交易被确认
    await stakeContract.waitForDeployment();

    // 获取合约地址
    const contractAddress = await stakeContract.getAddress();

    console.log("✅ RCCStake deployed successfully at:", contractAddress);
  } catch (error) {
    console.error("❌ Deployment failed:", error);
    process.exit(1);
  }
}

// 执行部署脚本
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deployment error:", error);
    process.exit(1);
  });
