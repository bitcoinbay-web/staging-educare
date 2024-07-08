"use client"

// Import necessary modules and components
import React from 'react'
import { useAccount, useSignMessage } from 'wagmi'
import { config } from '@/lib/config'
import { Button } from './ui/button'

// Define type for byte array
export type ByteArray = Uint8Array
// Define type for hexadecimal string
export type Hex = `0x${string}`
// Define type for hash
export type Hash = `0x${string}`

// Define props interface for the component
interface Props {
  message: SignableMessage
}

// Define type for signable message
export type SignableMessage =
  | string
  | {
      /** Raw data representation of the message. */
      raw: Hex | ByteArray
    }

// Define the main component
const WagmiUseSignMessage = () => {
  // Get the user's account address
  const { address } = useAccount({ config }) 
  // Get the sign message function and data from the hook
  const { data, signMessage } = useSignMessage()

  return (
    <div>
      <h2>Sign Message</h2>

      {/* Form to capture the message to be signed */}
      <form
        onSubmit={(event) => {
          event.preventDefault()
          // Extract the message from the form data and sign it
          const formData = new FormData(event.target as HTMLFormElement)
          signMessage({
            message: formData.get('message') as string,
            account: address
          })
        }}
      >
        {/* Input field for the message */}
        <input className='border' name="message" />
        <Button type="submit">Sign Message</Button>
      </form>

      {/* Display the signed data */}
      {data}
    </div>
  )
}

export default WagmiUseSignMessage
