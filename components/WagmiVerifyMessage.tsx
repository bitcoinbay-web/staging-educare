"use client"

import { network } from '@/constants'
import { config } from '@/lib/config'
import React, { useState, useEffect } from 'react'

import { useAccount } from 'wagmi'

import { Button } from './ui/button'
import Loader from './Loader'
import WagmiValidateMessage from '@/lib/services/WagmiValidateMessage'

const WagmiVerifyMessage = () => {
  const { address } = useAccount({ config }) 

  const [message, setMessage] = useState("")
  const [signature, setSignature] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isValid, setIsValid] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    try {
      if (address === undefined) {
        setIsValid(false);
        setIsLoading(false);
      } else {
        const verifyMessage = WagmiValidateMessage(address, message, signature).then((res) => {
          console.log(res);
          setIsValid(res)
          setIsLoading(false);
        })
      }
    } catch (error) {
      console.log(error);
      setIsValid(false);
      setIsLoading(false);
    }
  }, [address, message, signature])

  return (
    <div>
      <h2>WagmiVerifyMessge</h2> 
      <form 
        onSubmit={(event) => {
          event.preventDefault()
          const messageInput = new FormData(event.target as HTMLFormElement)
          const messageData = messageInput.get('message') as string;
          setMessage(messageData)
          const signatureInput = new FormData(event.target as HTMLFormElement)
          const signatureData = signatureInput.get('signature') as string;
          setSignature(signatureData)
        }}
      >
        <div>
          <input className='border' name="message" />
          Message data
        </div>
        <br />
        <div>
          <input className='border' name="signature" />
          Signed Message
        </div>
        <Button type="submit">Verify Message</Button>

      </form>
      {isValid ? (
        <div>True</div> 
      ) : (
        <div>False</div>
      )}
    </div>
  )
}

export default WagmiVerifyMessage