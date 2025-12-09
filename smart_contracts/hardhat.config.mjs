import "@nomicfoundation/hardhat-ethers";

export default {
  solidity: "0.8.19",
  networks: {
    sepolia: {
      url: "https://base-goerli.infura.io/v3/3e6eaf4b16e4401c8773515091f08229",
      accounts: ["cfcf932c9f9e690dbdaaa471e3481fc732b614307b70f20337d9fcfbf5d16607"]
    }
  }
};