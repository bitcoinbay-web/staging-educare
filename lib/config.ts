import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";
import { cookieStorage, createStorage } from "wagmi";
import { createConfig, http } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'
import { coinbaseWallet, injected, walletConnect } from 'wagmi/connectors'

export const projectId = "d7249a66e952859b00d83dc41da38c85"

// if (!projectId) throw new Error("Project ID is not defined");

const metadata = {
  name: "Web3Modal Example",
  description: "Web3Modal Example",
  url: "https://web3modal.com",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

declare module 'wagmi' { 
  interface Register { 
    config: typeof config 
  } 
} 

// export const config = defaultWagmiConfig({
//   chains: [mainnet, sepolia],
//   connectors: [injected()],
//   projectId,
//   metadata,
//   ssr: true,
  // storage: createStorage({
  //   storage: cookieStorage,
  // }),
// });

export const config = createConfig({
  chains: [
    // mainnet, 
    sepolia
  ],
  connectors: [
    injected(),
    coinbaseWallet({ appName: 'Create Wagmi' }),
    walletConnect({ projectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID }),
  ],
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
  transports: {
    // [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
})