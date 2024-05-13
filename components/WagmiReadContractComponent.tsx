// "use client"

// import { useState, useEffect, SetStateAction } from 'react'
// import { useReadContract } from 'wagmi'
// import { promises as fs } from 'fs';

// import { abi } from '@/constants/tempABI';
// import { config } from '@/lib/config'
// import { Button } from './ui/button'
// import { network } from "@/constants";
// import WagmiReadContracts from '@/lib/services/WagmiReadContract';

// const address="0xaB238839D44bc09B5090b85B7F1305cC1eef28b6"

// const WagmiReadContractComponent = () => {
//   const [isLoading, setIsLoading] = useState(false)
//   const [contractResult, setContractResult] = useState('')
//   const [functionName, setFunctionName] = useState('')
//   const [args, setArgs] = useState<readonly [bigint]>([BigInt(1)]);

//   useEffect(() => {
//     if (!functionName || !args) return;

//     setIsLoading(true);

//     const argsArray = args.split(',').map(arg => BigInt(arg.trim()));

//     WagmiReadContracts({
//       address: '0xaB238839D44bc09B5090b85B7F1305cC1eef28b6',
//       functionName: functionName,
//       args: argsArray,
//     }).then(result => {
//       setContractResult(result.toString());
//       setIsLoading(false);
//     }).catch(error => {
//       console.error('Error:', error);
//       setIsLoading(false);
//       // Handle errors
//     });
//   }, [functionName, args]);

//   // useEffect(() => {
//   //   setIsLoading(true)
//   //   try {
//   //     const readContract = WagmiReadContracts([BigInt(123456789)]).then((res) => {
//   //       console.log(readContract)
//   //     })
//   //   } catch (error) {
//   //     console.log(error)
//   //   }
//   // }, [functionName, args])

//   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     const formData = new FormData(event.currentTarget);
//     const submittedFunctionName = formData.get('functionName') as string;
//     const submittedArgs = formData.get('args') as string;

//     setFunctionName(submittedFunctionName);
//     setArgs(submittedArgs);
//   };
  
//   return (
//     <div>
//       <div>
//         WagmiReadContractComponent {contractResult && <div>{contractResult.toString()}</div>}
//       </div>
//       <div>
//         <form onSubmit={handleSubmit}>
//         {/* <form
//           onSubmit={(event) => {
//             event.preventDefault()
//             const functionInput = new FormData(event.target as HTMLFormElement)
//             const functionData = functionInput.get('functionName') as string;
//             setFunctionName(functionData)
//             }
//           }
//         > */}
//           <input className='border' name="functionName" placeholder="Function Name" />
//           <input className='border' name="args" placeholder="Arguments (comma separated)" />
//           <Button type="submit">Function Call</Button>
//         </form>
//       </div>
//     </div>
//   )
// }

// export default WagmiReadContractComponent


//     // if (functionName && args.length > 0) {
//     //   setIsLoading(true);
//     //   try {
//     //     const { data } = useReadContract({
//     //       abi,
//     //       address,
//     //       functionName: functionName as "symbol" | "tokenURI" | "name" | "owner" | "balanceOf" | "getApproved" | "isApprovedForAll" | "ownerOf" | "supportsInterface" | "tokenByIndex" | "tokenOfOwnerByIndex" | "totalSupply",
//     //       args: args as readonly unknown[] | undefined,
//     //       chainId: network.sepolia.id,
//     //       config
//     //     });
//     //     console.log(data)
//     //     setIsLoading(false);
//     //     if (typeof data === 'string') {
//     //       setContractResult(data);
//     //     } else if (typeof data === 'bigint') {
//     //       setContractResult(data.toString());
//     //     }
//     //   } catch (error) {
//     //     console.log(error)
//     //     setIsLoading(false);
//     //     setContractResult('');
//     //   }
//     // }
//   // }, [args, functionName])

//   // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//   //   event.preventDefault()
//   //   const formData = new FormData(event.currentTarget)
//   //   const functionNameInput = formData.get('functionName') as string
//   //   const argsInput = formData.get('args') as string

//   //   // Splitting argsInput string into an array of strings
//   //   const argsArray = argsInput.split(',').map(arg => arg.trim())

//   //   // Convert argsArray to readonly string[]
//   //   const readonlyArgsArray: readonly string[] = argsArray;

//   //   // Update state with input values
//   //   setFunctionName(functionNameInput);
//   //   setArgs(readonlyArgsArray as SetStateAction<readonly []>);