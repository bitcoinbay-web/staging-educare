'use client'

import React, { useState, useEffect } from 'react'
import { getTransaction, getTransactionReceipt } from '@wagmi/core'

import { config } from '@/lib/config'
import Loader from './Loader'

interface Props {
  txHash: string;
  currentNetwork: any;
}

const WagmiTransactionComponents: React.FC<Props> = ({ txHash, currentNetwork }) => {
  const [blockHash, setBlockHash] = useState('')
  const [blockNumber, setBlockNumber] = useState('')
  const [sender, setSender] = useState('')
  const [value, setValue] = useState('')
  const [gas, setGas] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)

    try {
      const transaction = getTransaction(config, {
        chainId: currentNetwork.id,
        hash: txHash as `0x${string}`,
      }).then(res => {
          console.log(res)
          setBlockHash(res.blockHash)
          setBlockNumber(res.blockNumber.toString())
          setSender(res.from)
          setValue(res.value.toString())
          setGas(res.gas.toString())
          setIsLoading(false)
      })
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
   }, [txHash, currentNetwork])
  
  if (isLoading) return <Loader />

  return (
    <div>
      <div>Block Hash: {blockHash}</div>
      <div>Block Height: {blockNumber}</div>
      <div>Transaction Hash: {txHash}</div>      
      <div>Sender Address: {sender}</div>
      <div>Value: {value} Wei</div>
      <div>Gas Fees: {gas} gas</div>
    </div>
  )
}

export default WagmiTransactionComponents