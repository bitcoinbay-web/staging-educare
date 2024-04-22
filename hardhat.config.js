require("@nomicfoundation/hardhat-toolbox");

const INFURA_API_KEY = process.env.INFURA_SECRET_KEY;
const PRIV_KEY = process.env.PRIV_KEY;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: {
        enabled: false,
        runs: 200
      }
    }
  },
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545"
    },
    sepolia: {
      url: `https://sepolia.infura.io/v3/${INFURA_API_KEY}`,
      // accounts: {
      //   mnemonic: process.env.MNEMONIC,
      //   path: "m/44'/60'/0'/0",
      //   initialIndex: 0,
      //   count: 20
      // }
      accounts: [`0x${'346f11f2ea3839a64fb19c43591ac9bbbc622a01403009c1897cceb3571d74bd'}`]
    },
    hardhat: {},
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  mocha: {
    timeout: 40000
  }
};
