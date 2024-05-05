// "use client"

// import React from 'react'
// import { useSignMessage } from 'wagmi'

// export type ByteArray = Uint8Array
// export type Hex = `0x${string}`
// export type Hash = `0x${string}`

// interface Props {
//   message: SignableMessage
// }

// export type SignableMessage =
//   | string
//   | {
//       /** Raw data representation of the message. */
//       raw: Hex | ByteArray
//     }

// const WagmiUseSignMessage: React.FC<Props> = ({ message }) => {
//   const { data, signMessage } = useSignMessage()

//   return (
//     <div>
//       <h2>Sign Message</h2>

//       <form
//         onSubmit={(event) => {
//           event.preventDefault()
//           const formData = new FormData(event.target as HTMLFormElement)
//           signMessage({
//             message: formData.get('message') as string,
//           })
//         }}
//       >
//         <input className='border' name="message" />
//         <button type="submit">Sign Message</button>
//       </form>

//       {data}
//     </div>
//   )
// }

// export default WagmiUseSignMessage