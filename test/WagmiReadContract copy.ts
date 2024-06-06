import { getAccount, readContract } from '@wagmi/core'

import { network } from '@/constants'
import { config } from '@/lib/config'

import { abi } from '@/constants/tempABI';

const WagmiReadContracts = async (functionName, ...args: any[]): Promise<any> => {
  const { address } = getAccount(config)

  console.log(args)

  try {
    const result = await readContract(config, {
      abi,
      chainId: network.sepolia.id,
      address: '0xaB238839D44bc09B5090b85B7F1305cC1eef28b6',
      functionName: functionName,
      // args: args.length > 0 ? args as unknown as readonly [bigint] : undefined,
      args: [...args], // as readonly unknown[] | undefined,
      account: address
    })
    // .then((res) => {
    //    console.log(res)
    // })
    console.log(result);
    return result;
  } catch (error) {
    console.log(error)
  }

}

export default WagmiReadContracts