"use client";

import { createWeb3Modal, defaultConfig } from "@web3modal/ethers/react";
import { projectId } from "@/lib/config";

// 1. Get projectId at https://cloud.walletconnect.com
// const projectId = "719df5c1c0c7dae178176dbaf1d0f19f";

// 2. Set chains
const mainnet = {
  chainId: 1,
  name: "Ethereum",
  currency: "ETH",
  explorerUrl: "https://etherscan.io",
  rpcUrl: "https://cloudflare-eth.com",
};

// 2.1 Set localhost chains
const localhost = {
  chainId: 0,
  name: "Ethereum",
  currency: "ETH",
  explorerUrl: "http://127.0.0.1:8545",
  rpcUrl: "http://127.0.0.1:8545/",
};

// 3. Create a metadata object
const metadata = {
  name: "Web3 modal example",
  description: "Web3Modal Example",
  url: "https://web3modal.com", // origin must match your domain & subdomain
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};
// 4. Create Ethers config
const ethersConfig = defaultConfig({
  /*Required*/
  metadata,

  /*Optional*/
  enableEIP6963: true, // true by default
  enableInjected: true, // true by default
  enableCoinbase: true, // true by default
  rpcUrl: "...", // used for the Coinbase SDK
  defaultChainId: 1, // used for the Coinbase SDK
});

// 5. Create a Web3Modal instance
createWeb3Modal({
  ethersConfig,
  chains: [localhost],
  projectId,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
  enableOnramp: true, // Optional - false as default
});

export function Web3Modal({ children }) {
  return children;
}
