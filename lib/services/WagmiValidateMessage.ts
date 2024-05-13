import { network } from '@/constants'
import { config } from '@/lib/config'

import { verifyMessage, verifyTypedData } from '@wagmi/core'

const WagmiValidateMessage = async (address, message, signature) => {
  const validateMessage = await verifyMessage(config, {
    chainId: network.sepolia.id,
    address: address,
    message: message,
    signature: signature
  })

  return validateMessage;
}

export default WagmiValidateMessage