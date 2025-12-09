// scripts/deploy.js
const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);

  const PredictionMarket = await hre.ethers.getContractFactory("PredictionMarket");

  const predictionMarket = await PredictionMarket.deploy();
  await predictionMarket.deployed();

  console.log("PredictionMarket deployed to:", predictionMarket.address);

  const tx = await predictionMarket.createMarket(
    "0x1", // marketId (string)
    "Will Bitcoin reach $100k by end of 2025?", // question
    "This market resolves YES if Bitcoin reaches $100,000 USD on any major exchange by Dec 31, 2025.", // description
    Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30, // endTime = 30 days from now
    "Crypto", // category
    "https://example.com/btc.png", // image_url
    ["bitcoin", "crypto", "price"] // tags
  );
  await tx.wait();
  console.log("Sample market created!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });