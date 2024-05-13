"use client"

import React from 'react'
import { useAccount, useSignMessage } from 'wagmi'
import { config } from '@/lib/config'
import { Button } from './ui/button'

export type ByteArray = Uint8Array
export type Hex = `0x${string}`
export type Hash = `0x${string}`

interface Props {
  message: SignableMessage
}

export type SignableMessage =
  | string
  | {
      /** Raw data representation of the message. */
      raw: Hex | ByteArray
    }

const WagmiUseSignMessage = () => {
  const { address } = useAccount({ config }) 
  const { data, signMessage } = useSignMessage()

  return (
    <div>
      <h2>Sign Message</h2>

      <form
        onSubmit={(event) => {
          event.preventDefault()
          const formData = new FormData(event.target as HTMLFormElement)
          signMessage({
            message: formData.get('message') as string,
            account: address
          })
        }}
      >
        <input className='border' name="message" />
        <Button type="submit">Sign Message</Button>
      </form>

      {data}
    </div>
  )
}

export default WagmiUseSignMessage