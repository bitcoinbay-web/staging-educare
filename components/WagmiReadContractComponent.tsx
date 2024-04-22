import React, { useState, useEffect } from 'react'

// import { connect } from '@wagmi/core'
// import { injected } from '@wagmi/connectors'
import { abi } from '@/constants/tempABI';

import { config } from '@/lib/config'
import { promises as fs } from 'fs';
import { getAccount, readContract } from '@wagmi/core'

interface ReadContractProps {
  address:`0x${string}`;
  functionName: any;
  args: [bigint];
  currentNetwork: any;
}

const WagmiReadContractComponent = async ({ address, functionName, args, currentNetwork }: ReadContractProps) => {
  // const file = await fs.readFile(process.cwd() + '/artifacts/contracts/ERC721.sol/EduCare.json', 'utf8');
  // const file = await fs.readFile(process.cwd() + '/constants/tempABI.json', 'utf8');

  // const data = JSON.parse(file);

  // const abi = data.abi;

  const result = await readContract(config, {
    abi,
    address: address,
    functionName: functionName,
    args: [...args],
    chainId: currentNetwork.id,
  })

  return (
    <div>WagmiReadContractComponent {result.toString()}</div>
  )
}

export default WagmiReadContractComponent

