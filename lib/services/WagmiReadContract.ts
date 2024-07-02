import { getAccount, readContract } from '@wagmi/core'

import { network } from '@/constants'
import { config } from '@/lib/config'

import { abi } from '@/constants/tempABI';
import { contractAddress } from "@/constants/index"

type ValidArgs = readonly [] | readonly [`0x${string}`] | readonly [bigint] | readonly [`0x${string}`, `0x${string}`] | readonly [`0x${string}`, bigint];

const WagmiReadContracts = async (functionName, ...args: any[]): Promise<any> => {
  const { address } = getAccount(config)

  let validArgs: ValidArgs | undefined;

  if (args.length === 0) {
    validArgs = [];
  } else if (args.length === 1 && typeof args[0] === 'bigint') {
    validArgs = [args[0] as bigint];
  } else if (args.length === 1 && typeof args[0] === 'string' && args[0].startsWith('0x')) {
    validArgs = [`0x${args[0]}`];
  } else if (args.length === 2 && typeof args[0] === 'string' && args[0].startsWith('0x') && typeof args[1] === 'bigint') {
    validArgs = [`0x${args[0]}`, args[1] as bigint];
  } else if (args.length === 2 && typeof args[0] === 'string' && args[0].startsWith('0x') && typeof args[1] === 'string' && args[1].startsWith('0x')) {
    validArgs = [`0x${args[0]}`, `0x${args[1]}`];
  } else {
    throw new Error('Invalid arguments passed to readContract');
  }

  try {
    const result = await readContract(config, {
      abi,
      chainId: network.sepolia.id,
      address: contractAddress,
      functionName,
      args: validArgs,
      account: address,
    });
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
  }
}

export default WagmiReadContracts