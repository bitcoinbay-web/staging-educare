// import { getAccount, readContract } from '@wagmi/core'

// import { network } from '@/constants'
// import { config } from '@/lib/config'

// import { abi } from '@/constants/tempABI';

// const WagmiReadContracts = async ([...args]: any[]) => {
//   const { address } = getAccount(config)

//   const result = await readContract(config, {
//     abi,
//     chainId: network.sepolia.id,
//     address: '0xaB238839D44bc09B5090b85B7F1305cC1eef28b6',
//     functionName: 'tokenURI',
//     args: args as unknown as readonly [] | readonly [bigint] | undefined,
//     // args: [...args] as readonly unknown[] | undefined,
//     account: address
//   })

//   return result;
// }

// export default WagmiReadContracts