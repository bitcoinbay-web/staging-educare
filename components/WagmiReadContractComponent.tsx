"use client"

import React, { useState, useEffect } from 'react'

// import { connect } from '@wagmi/core'
// import { injected } from '@wagmi/connectors'
import { abi } from '@/constants/tempABI';

import { config } from '@/lib/config'
import { promises as fs } from 'fs';
// import { getAccount, readContract } from '@wagmi/core'
import { useReadContract } from 'wagmi'

interface ReadContractProps {
  address:`0x${string}`;
  functionName: any;
  args: [bigint];
  currentNetwork: any;
}

const WagmiReadContractComponent = ({ address, functionName, args, currentNetwork }: ReadContractProps) => {
  const { data } = useReadContract({
    abi,
    address: address,
    functionName: functionName,
    args: [...args],
    chainId: currentNetwork.id,
    config
  })
  console.log(data);

  return (
    <div>
      WagmiReadContractComponent {data && <div>{data.toString()}</div>}
    </div>
  )
}

export default WagmiReadContractComponent

