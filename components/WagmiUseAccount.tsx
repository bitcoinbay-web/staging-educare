'use client'

import { useAccount, useConnect, useDisconnect } from 'wagmi'

const WagmiUseAccount = () => {
  const account = useAccount()
  const { connectors, connect, status, error } = useConnect()
  const { disconnect } = useDisconnect()

  return (
    <div>
      <div>
          status: {account.status}
          <br />
          addresses: {JSON.stringify(account.addresses)}
          <br />
          chainId: {account.chainId}
        </div>      
    </div>
  )
}

export default WagmiUseAccount