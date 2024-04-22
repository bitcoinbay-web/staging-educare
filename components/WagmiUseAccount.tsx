import React from 'react'

import { connect, getAccount } from '@wagmi/core'
import { injected } from '@wagmi/connectors'
import { config } from '@/lib/config'
import { network } from '@/constants'

const WagmiUseAccount = async () => {
  // const result = await connect(config, {
  //   chainId: network.sepolia.id,
  //   connector: injected(),
  // })

  // const account = await getAccount(config)
  // console.log(account);

  return (
    <div>WagmiUseAccount</div>
  )
}

export default WagmiUseAccount