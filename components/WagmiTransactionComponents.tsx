'use client'

import React, { useState, useEffect } from 'react'
import { getTransaction, getTransactionReceipt } from '@wagmi/core'

import { config } from '@/lib/config'
import Loader from './Loader'
import { network } from '@/constants'
import { Button } from './ui/button'

interface Props {
  txHash: string;
  currentNetwork: any;
}

const WagmiTransactionComponents = () => {
  const [blockHash, setBlockHash] = useState('N/A')
  const [blockNumber, setBlockNumber] = useState('N/A')
  const [sender, setSender] = useState('N/A')
  const [value, setValue] = useState('N/A')
  const [gas, setGas] = useState('N/A')
  const [isLoading, setIsLoading] = useState(false)
  const [txHash, setTxHash] = useState('')
  const [currentNetwork, setCurrentNetwork] = useState(network.sepolia.id)

  useEffect(() => {
    setIsLoading(true)

    const transaction = getTransaction(config, {
      chainId: currentNetwork,
      hash: txHash as `0x${string}`,
    }).then(res => {
        console.log(res)
        setBlockHash(res.blockHash)
        setBlockNumber(res.blockNumber.toString())
        setSender(res.from)
        setValue(res.value.toString())
        setGas(res.gas.toString())
        setIsLoading(false)
    }).catch((error) => {
      setIsLoading(false);
      console.log(error);
      setBlockHash('N/A')
      setBlockNumber('N/A')
      setSender('')
      setValue('')
      setGas('')
    })
  }, [txHash, currentNetwork])
  
  return (
    <div>
      <div>Block Hash: {blockHash}</div>
      <div>Block Height: {blockNumber}</div>
      <div>Transaction Hash: {txHash}</div>      
      <div>Sender Address: {sender}</div>
      <div>Value: {value} Wei</div>
      <div>Gas Fees: {gas} gas</div>
      <div>
        <form
          onSubmit={(event) => {
            event.preventDefault()
            const formData = new FormData(event.target as HTMLFormElement)
            setTxHash(formData.get('txHash') as string)
            }
          }
        >
          <input className='border' name="txHash" />
          <Button type="submit">Search Transaction</Button>
        </form>
      </div>
    </div>
  )
}

export default WagmiTransactionComponents