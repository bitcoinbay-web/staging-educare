import { promises as fs } from "fs";
import hre from "hardhat";

import { http, createConfig, useTransaction } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";

export const config = createConfig({
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
});

function App() {
  const result = useTransaction({
    hash: "0x0fa64daeae54e207aa98613e308c2ba8abfe274f75507e741508cc4db82c8cb5",
  });

  // console.log(result)
}

async function contractDetails() {
  const file = await fs.readFile(
    process.cwd() + "/ignition/deployments/chain-31337/deployed_addresses.json",
    "utf8"
  );
  const address = JSON.parse(file);

  const abi = await fs
    .readFile(
      process.cwd() +
        "/ignition/deployments/chain-31337/artifacts/EduCare#EduCare.json",
      "utf8"
    )
    .then((res) => {
      const artifact = JSON.parse(res);
      return artifact.abi;
    });

  const result = await hre.ethers;
  const [owner] = await hre.ethers.getSigners();

  // console.log(owner);

  // console.log(address);
  // console.log(abi);
  return [address, abi];
}

App();
