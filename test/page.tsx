// "use client";

// import React from 'react'
// import WagmiTransactionComponents from '@/components/WagmiTransactionComponents';
// import WagmiReadContractComponent from '@/components/WagmiReadContractComponent';

// import { mainnet, sepolia } from '@wagmi/core/chains'
// import { network } from '@/constants';
// import WagmiUseAccount from '@/components/WagmiUseAccount';

// import { useWalletInfo } from '@web3modal/wagmi/react'
// // import WagmiUseSignMessage from '@/components/WagmiUseSignMessage';
// import WagmiVerifyMessge from '@/components/WagmiVerifyMessge';

// const Home = () => {
//   // const { walletInfo } = useWalletInfo()

//   // console.log(walletInfo.name, walletInfo.icon)

//   const now = new Date();

//   const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
//   const date = (new Intl.DateTimeFormat('en-US', { dateStyle: 'full' })).format(now);
  
//   return (
//     <section className="flex size-full flex-col gap-5 text-black">  
//       <div className="h-[303px] w-full rounded-[20px] bg-hero bg-cover">
//         <div className="flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11">
//           <div className="flex flex-col gap-2">
//             <h1 className="text-4xl font-extrabold lg:text-7xl">{time}</h1>
//             <p className="text-lg font-medium text-sky-1 lg:text-2xl">{date}</p>
//             {/* <WagmiTransactionComponents 
//               txHash='0x15c13cbfd7e4c36c9e3f6f2fda3fd0e5e9af43f5c18d4a8cf29b614549e3e10b' 
//               currentNetwork={network.sepolia}
//             />
//             <WagmiReadContractComponent 
//               address='0xaB238839D44bc09B5090b85B7F1305cC1eef28b6'
//               functionName='tokenURI'
//               args={[BigInt(123456789)]}
//               currentNetwork={network.sepolia}
//             />
//             <WagmiUseAccount /> */}
//             {/* <WagmiUseSignMessage message={''} /> */}
//             <WagmiVerifyMessge />
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }

// export default Home