"use client"

import { network } from '@/constants'
import { config } from '@/lib/config'
import React from 'react'

import { useVerifyMessage } from 'wagmi'

const WagmiVerifyMessge = () => {
  const result = useVerifyMessage({
    address: '0x25c436d88286C20EA976bc014131649D008BA3E2',
    message: 'hello educare',
    signature: '0xeceb61cb66056b5fc7a52cbc0086eaeb8cb29f12291f2dfc3558237f7d326cfc700831069c0f8130fec16dab0b5fdf9d9a0d6a4e8ec14699fe8fe9f6ecf71c4a1c',
    chainId: network.sepolia.id,
    config
  })

  console.log(result.data)
  return (
    <div>WagmiVerifyMessge</div>
  )
}

export default WagmiVerifyMessge